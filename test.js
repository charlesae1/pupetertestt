const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    const url = 'https://rubinot.com.br/?subtopic=characters&name=Ulezovisk';
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const content = await page.content();

    if (content.includes('Character Information') || content.includes('Ulezovisk')) {
      console.log('✅ Acesso permitido e conteúdo carregado.');
    } else {
      console.log('⚠️ Página carregada, mas conteúdo esperado não encontrado.');
    }
  } catch (err) {
    console.error('❌ Erro ao acessar o site:', err.message);
  }

  await browser.close();
})();