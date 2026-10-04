#!/usr/bin/env node
/**
 * Prerender.io Integration Debug Tool
 * 
 * Usage: node debug-prerender.js [URL] [--verbose]
 * 
 * Tests the prerender.io integration with various user agents
 * and provides detailed debugging information.
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

// Configuration
const DEFAULT_URL = 'http://localhost:3333';
const TIMEOUT = 10000;

// Test cases with expected behavior
const TEST_CASES = [
  {
    name: 'Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    shouldTriggerPrerender: true,
    description: 'Primary search engine crawler'
  },
  {
    name: 'Bingbot', 
    userAgent: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    shouldTriggerPrerender: true,
    description: 'Microsoft search crawler'
  },
  {
    name: 'Facebook Crawler',
    userAgent: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    shouldTriggerPrerender: true,
    description: 'Social media link preview'
  },
  {
    name: 'Twitter Bot',
    userAgent: 'Twitterbot/1.0',
    shouldTriggerPrerender: true,
    description: 'Social media card crawler'
  },
  {
    name: 'LinkedIn Bot',
    userAgent: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com/)',
    shouldTriggerPrerender: true,
    description: 'Professional network crawler'
  },
  {
    name: 'Chrome Browser',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    shouldTriggerPrerender: false,
    description: 'Regular user browser'
  },
  {
    name: 'Safari Browser',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    shouldTriggerPrerender: false,
    description: 'Regular user browser'
  },
  {
    name: 'Mobile Chrome',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    shouldTriggerPrerender: false,
    description: 'Mobile user browser'
  }
];

// Command line argument parsing
const args = process.argv.slice(2);
const targetUrl = args.find(arg => !arg.startsWith('--')) || DEFAULT_URL;
const verbose = args.includes('--verbose');

async function makeRequest(url, userAgent) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          responseTime: Date.now() - startTime
        });
      });
    });

    const startTime = Date.now();
    
    req.on('error', (e) => {
      reject(new Error(`Request failed: ${e.message}`));
    });

    req.setTimeout(TIMEOUT, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

function analyzeResponse(response, testCase) {
  const headers = response.headers;
  const isPrerendered = headers['x-prerendered'] === 'true';
  const isBot = headers['x-bot'] === 'true';
  const botDetected = headers['x-bot-detected'] === 'true';
  
  const analysis = {
    testCase: testCase.name,
    userAgent: testCase.userAgent,
    expected: testCase.shouldTriggerPrerender,
    actual: {
      isPrerendered,
      isBot,
      botDetected,
      statusCode: response.statusCode,
      responseTime: response.responseTime,
      contentLength: response.body.length
    },
    headers: {
      'x-prerendered': headers['x-prerendered'] || 'missing',
      'x-bot': headers['x-bot'] || 'missing', 
      'x-bot-detected': headers['x-bot-detected'] || 'missing',
      'cache-control': headers['cache-control'] || 'none'
    },
    content: {
      hasHtml: response.body.includes('<html'),
      hasMotifBrand: response.body.includes('MOTIF'),
      hasReactRoot: response.body.includes('__next'),
      isLikelyPrerendered: response.body.includes('<html') && !response.body.includes('__next')
    }
  };

  // Determine if behavior matches expectations
  if (testCase.shouldTriggerPrerender) {
    analysis.status = isBot ? 'PASS' : 'FAIL';
    analysis.message = isBot ? 
      (isPrerendered ? 'Bot correctly routed through prerender.io' : 'Bot detected but prerender.io failed (fallback working)') :
      'Bot not detected - check user agent patterns';
  } else {
    analysis.status = !isBot && !isPrerendered ? 'PASS' : 'FAIL';
    analysis.message = (!isBot && !isPrerendered) ? 
      'User correctly served interactive version' :
      'User incorrectly treated as bot';
  }

  return analysis;
}

function printResults(results) {
  console.log('\n🔍 PRERENDER.IO INTEGRATION ANALYSIS');
  console.log('═'.repeat(60));
  
  const botResults = results.filter(r => r.expected);
  const userResults = results.filter(r => !r.expected);
  
  // Summary stats
  const botPasses = botResults.filter(r => r.status === 'PASS').length;
  const userPasses = userResults.filter(r => r.status === 'PASS').length;
  const totalPrerenderSuccesses = results.filter(r => r.actual.isPrerendered).length;
  
  console.log(`\n📊 SUMMARY`);
  console.log(`   Bot Detection: ${botPasses}/${botResults.length} passing`);
  console.log(`   User Handling: ${userPasses}/${userResults.length} passing`);
  console.log(`   Prerender.io Success Rate: ${totalPrerenderSuccesses}/${botResults.length} bots`);
  
  // Detailed results
  console.log(`\n🤖 BOT TESTS (${botResults.length})`);
  botResults.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    const prerenderIcon = result.actual.isPrerendered ? '🚀' : '⚠️';
    
    console.log(`${icon} ${result.testCase}`);
    console.log(`   ${prerenderIcon} Prerendered: ${result.actual.isPrerendered ? 'Yes' : 'No'}`);
    console.log(`   🕵️ Bot Detected: ${result.actual.isBot ? 'Yes' : 'No'}`);
    console.log(`   ⏱️ Response Time: ${result.actual.responseTime}ms`);
    console.log(`   💬 ${result.message}`);
    
    if (verbose) {
      console.log(`   📋 Headers:`, result.headers);
      console.log(`   📄 Content Analysis:`, result.content);
    }
    console.log('');
  });
  
  console.log(`👤 USER TESTS (${userResults.length})`);
  userResults.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    
    console.log(`${icon} ${result.testCase}`);
    console.log(`   🚀 Prerendered: ${result.actual.isPrerendered ? 'Yes (ERROR)' : 'No'}`);
    console.log(`   🕵️ Bot Detected: ${result.actual.isBot ? 'Yes (ERROR)' : 'No'}`);
    console.log(`   ⏱️ Response Time: ${result.actual.responseTime}ms`);
    console.log(`   💬 ${result.message}`);
    console.log('');
  });
  
  // Integration health check
  console.log(`🏥 INTEGRATION HEALTH`);
  const health = {
    botDetectionWorking: botPasses === botResults.length,
    userExperienceIntact: userPasses === userResults.length,
    prerenderServiceConnected: totalPrerenderSuccesses > 0,
    fallbackWorking: botResults.every(r => r.actual.statusCode === 200)
  };
  
  Object.entries(health).forEach(([check, passing]) => {
    const icon = passing ? '✅' : '❌';
    const label = check.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase());
    console.log(`   ${icon} ${label}`);
  });
  
  // Recommendations
  console.log(`\n💡 RECOMMENDATIONS`);
  if (!health.botDetectionWorking) {
    console.log(`   • Check bot user agent patterns in src/lib/prerender-middleware.ts`);
  }
  if (!health.prerenderServiceConnected) {
    console.log(`   • Verify prerender.io token and service availability`);
    console.log(`   • Check network connectivity to service.prerender.io`);
  }
  if (!health.userExperienceIntact) {
    console.log(`   • Review user agent detection logic - users being treated as bots`);
  }
  if (health.fallbackWorking && !health.prerenderServiceConnected) {
    console.log(`   • Fallback system working correctly (graceful degradation)`);
  }
}

async function runDebugSuite() {
  console.log('🧪 PRERENDER.IO DEBUG SUITE');
  console.log(`🎯 Target URL: ${targetUrl}`);
  console.log(`⚙️ Verbose Mode: ${verbose ? 'ON' : 'OFF'}`);
  console.log('─'.repeat(60));
  
  const results = [];
  
  for (const testCase of TEST_CASES) {
    try {
      console.log(`🔄 Testing ${testCase.name}...`);
      const response = await makeRequest(targetUrl, testCase.userAgent);
      const analysis = analyzeResponse(response, testCase);
      results.push(analysis);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`❌ Failed to test ${testCase.name}: ${error.message}`);
      results.push({
        testCase: testCase.name,
        status: 'ERROR',
        message: error.message,
        expected: testCase.shouldTriggerPrerender,
        actual: { error: error.message }
      });
    }
  }
  
  printResults(results);
}

// Main execution
if (require.main === module) {
  runDebugSuite().catch(error => {
    console.error('❌ Debug suite failed:', error.message);
    process.exit(1);
  });
}