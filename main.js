const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    transparent: true,
    webPreferences: {
      enableBlinkFeatures: 'CSSBackdropFilter',
    },
  });

  // Remove the default menu bar
  win.setMenuBarVisibility(false);
  win.setAutoHideMenuBar(true); // Hides the menu bar, but it can be shown with the Alt key (optional).

  win.loadURL('https://chatgpt.com'); // 表示する外部サイト

  // CSSを挿入してスタイルを変更
  win.webContents.on('dom-ready', () => {
    win.webContents.executeJavaScript(`
      // カスタムプロパティの値を変更
      document.documentElement.style.setProperty('--main-surface-primary', '#49505750');
      document.documentElement.style.setProperty('--main-surface-secondary', '#49505750');
      document.documentElement.style.setProperty('--sidebar-surface-primary', '#49505750');
      document.documentElement.style.setProperty('--sidebar-surface-secondary', '#49505750');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#d8dee9');
      document.documentElement.style.setProperty('--text-tertiary', '#d8dee9');
      document.documentElement.style.setProperty('--tw-gradient-stops', transparent);
    `);
    win.webContents.insertCSS(`
      .dark\\:text-gray-500:is(.dark *) {
        color: #eceff4 !important;
      }

      // code block
      .dark\\:bg-gray-950:is(.dark *) {
        background-color: #343a4050 !important;
      }
      // sidebar-item-focused
      .bg-token-sidebar-surface-primary {
        background-color: #49505750 !important;
      }

      // code line
      .dark\\:prose-invert:is(.dark *) :where(code):not(:where([class~=not-prose] *)) {
        background-color: #343a4030 !important;
      }
      .dark\\:prose-invert:is(.dark *) :where(code):not(:where([class~=not-prose] *)) {
        background-color: #343a4030 !important;
      }

      // sidemenu itemのグラデーションを削除
      .ltr\\:bg-gradient-to-l:where([dir=ltr],[dir=ltr] *) {
        background-image: none !important;
      }
      * {
        background-image: none !important;
      }
    `);
  });

  // OSテーマ変更時のイベントリスナー not working
  nativeTheme.on('updated', () => {
    const isDarkMode = nativeTheme.shouldUseDarkColors;
    console.log(`テーマが変更されました: ${isDarkMode ? 'ダークモード' : 'ライトモード'}`);
  });
});

app.on("window-all-closed", () => {
    app.quit();
});
