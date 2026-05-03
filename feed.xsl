<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  exclude-result-prefixes="atom dc">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
  <style>
    :root{--navy:#233A5E;--burgundy:#B12C4B;--ivory:#F5EEE8;--border:#E8E0D8;--muted:#6B7A8D;--white:#fff}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{-webkit-font-smoothing:antialiased}
    body{font-family:"Inter",-apple-system,sans-serif;background:var(--ivory);color:#1E1E1E;line-height:1.6;min-height:100vh}
    a{color:var(--burgundy);text-decoration:none}
    a:hover{text-decoration:underline}

    .top-bar{background:var(--navy);color:rgba(255,255,255,.75);font-size:.82rem;padding:10px 0;text-align:center}
    .top-bar strong{color:#fff}
    .top-bar a{color:rgba(255,255,255,.75);text-decoration:underline}

    .nav{background:rgba(245,238,232,.97);border-bottom:1px solid rgba(35,58,94,.1);padding:0}
    .nav-inner{max-width:900px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between}
    .logo{font-weight:800;font-size:1.1rem;color:var(--navy);letter-spacing:-.5px}
    .back-link{font-size:.83rem;font-weight:600;color:var(--navy);opacity:.65;display:flex;align-items:center;gap:6px}
    .back-link:hover{opacity:1;text-decoration:none}

    .hero{background:var(--navy);padding:48px 24px 40px;text-align:center}
    .rss-icon{width:48px;height:48px;background:var(--burgundy);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px}
    .hero h1{font-size:1.75rem;font-weight:800;color:#fff;margin-bottom:8px}
    .hero p{color:rgba(255,255,255,.65);font-size:.95rem;max-width:520px;margin:0 auto 20px}
    .hero-meta{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap}
    .hero-meta span{font-size:.8rem;color:rgba(255,255,255,.5)}
    .hero-meta strong{color:rgba(255,255,255,.75)}
    .copy-btn{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;padding:8px 20px;border-radius:999px;font-size:.82rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background .2s}
    .copy-btn:hover{background:rgba(255,255,255,.2)}

    .wrap{max-width:900px;margin:0 auto;padding:0 24px}
    .section-label{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:40px 0 20px}

    .item{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:28px 32px;margin-bottom:20px;transition:box-shadow .2s}
    .item:hover{box-shadow:0 4px 24px rgba(35,58,94,.1)}
    .item-cat{display:inline-block;background:rgba(177,44,75,.1);color:var(--burgundy);font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:3px 10px;border-radius:999px;margin-bottom:12px}
    .item h2{font-size:1.08rem;font-weight:700;color:var(--navy);margin-bottom:8px;line-height:1.35}
    .item h2 a{color:var(--navy)}
    .item h2 a:hover{color:var(--burgundy);text-decoration:none}
    .item-meta{font-size:.78rem;color:var(--muted);margin-bottom:12px}
    .item p{font-size:.88rem;color:var(--muted);line-height:1.65;margin-bottom:16px}
    .item-link{font-size:.83rem;color:var(--burgundy);font-weight:600}

    .howto{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:28px 32px;margin:40px 0}
    .howto h3{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:12px}
    .howto p{font-size:.87rem;color:var(--muted);margin-bottom:10px}
    .howto code{background:rgba(35,58,94,.07);padding:2px 8px;border-radius:4px;font-size:.82rem;color:var(--navy);word-break:break-all}
    .reader-list{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
    .reader-list a{background:rgba(35,58,94,.07);color:var(--navy);padding:6px 14px;border-radius:999px;font-size:.78rem;font-weight:600}
    .reader-list a:hover{background:rgba(35,58,94,.13);text-decoration:none}

    footer{border-top:1px solid var(--border);padding:24px 0 40px;text-align:center;font-size:.8rem;color:var(--muted);margin-top:40px}
    footer a{color:var(--muted)}footer a:hover{color:var(--navy)}
  </style>
</head>
<body>
  <div class="top-bar">
    This is an <strong>RSS feed</strong>. Subscribe in any RSS reader app, or <a href="/insights">browse articles on the website</a>.
  </div>
  <nav class="nav">
    <div class="nav-inner">
      <span class="logo">PHARPRO</span>
      <a href="/insights" class="back-link">
        &#8592; Back to Insights
      </a>
    </div>
  </nav>

  <div class="hero">
    <div class="rss-icon">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
      </svg>
    </div>
    <h1><xsl:value-of select="/rss/channel/title"/></h1>
    <p><xsl:value-of select="/rss/channel/description"/></p>
    <div class="hero-meta">
      <span>Updated: <strong><xsl:value-of select="/rss/channel/lastBuildDate"/></strong></span>
      <span>&#8226;</span>
      <span><strong><xsl:value-of select="count(/rss/channel/item)"/></strong> articles</span>
    </div>
    <br/>
    <button class="copy-btn" onclick="copyFeed()">&#128279; Copy feed URL</button>
  </div>

  <div class="wrap">
    <p class="section-label">Latest articles</p>

    <xsl:for-each select="/rss/channel/item">
      <div class="item">
        <xsl:if test="category">
          <div class="item-cat"><xsl:value-of select="category"/></div>
        </xsl:if>
        <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
          <xsl:value-of select="title"/>
        </a></h2>
        <div class="item-meta">
          <xsl:value-of select="pubDate"/>
          <xsl:if test="dc:creator">
            &#160;&#183;&#160;<xsl:value-of select="dc:creator"/>
          </xsl:if>
        </div>
        <p><xsl:value-of select="description"/></p>
        <a class="item-link">
          <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
          Read full article &#8594;
        </a>
      </div>
    </xsl:for-each>

    <div class="howto">
      <h3>How to subscribe</h3>
      <p>Copy the feed URL below and paste it into your preferred RSS reader:</p>
      <code id="feed-url">https://pharpro.co/feed.xml</code>
      <div class="reader-list">
        <a href="https://feedly.com/i/subscription/feed/https://pharpro.co/feed.xml" target="_blank" rel="noopener">Feedly</a>
        <a href="https://www.inoreader.com/?add_feed=https://pharpro.co/feed.xml" target="_blank" rel="noopener">Inoreader</a>
        <a href="https://app.newsblur.com/?url=https://pharpro.co/feed.xml" target="_blank" rel="noopener">NewsBlur</a>
        <a href="https://theoldreader.com/feeds/subscribe?url=https://pharpro.co/feed.xml" target="_blank" rel="noopener">The Old Reader</a>
      </div>
    </div>

    <footer>
      <xsl:value-of select="/rss/channel/copyright"/> &#8212;
      <a href="https://pharpro.co">pharpro.co</a> &#160;&#183;&#160;
      <a href="mailto:info@pharpro.co">info@pharpro.co</a>
    </footer>
  </div>

  <script>
    function copyFeed() {
      const url = document.getElementById('feed-url').textContent;
      navigator.clipboard.writeText(url).then(function() {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✓ Copied!';
        setTimeout(function(){ btn.textContent = '🔗 Copy feed URL'; }, 2000);
      });
    }
  </script>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
