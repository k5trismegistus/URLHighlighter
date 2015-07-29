# URL Highlighter (仮称)  
こいつはまだまだ開発段階のアドオンです。
特に見た目はひどいです。

## What is This ?
ページ中のリンクからリンク先URLに特定の文字列を含むリンクを抽出し、リンクをハイライト表示させたりリンクURLを一括してクリップボードにコピーすることのできるプラグインです。

## Usage
このプラグインをインストールすると現れるボタンを押すとパネルが出てきます。  
このパネルの最下段にあるフォームから新しい「プロファイル」を登録することができます。プロファイルとはキーワードの組のことで、たとえば「動画」というプロファイルに'youtube.com'と'nicovideo.jp'（だっけ？）という２つのキーワードを与えておくと1クリックでYoutubeとニコニコ動画へのリンクすべてをハイライトする、またはクリップボードにコピー可能です。

![empty_panel](https://github.com/k5trismegistus/URLHighlighter/blob/master/docs/images/empty_panel.png)

プロファイルは名前とキーワードが指定可能で、キーワードはカンマ区切りで入力します。たとえば「Google」という名前のプロファイルで'google'と'youtube'という２つのキーワードをハイライトしたりできるようにしたい場合は、以下のように入力します。

![input](https://github.com/k5trismegistus/URLHighlighter/blob/master/docs/images/input.png)

これでSave Profileボタンを押すと、プロファイルが登録されてパネルがこうなります。

![added](https://github.com/k5trismegistus/URLHighlighter/blob/master/docs/images/added.png)

チェックボックスがハイライトするかしないかのトグルスイッチになっており、これをオンにすると…

![highlighted](https://github.com/k5trismegistus/URLHighlighter/blob/master/docs/images/highlight.png)

このように'google'と'youtube'を含むリンクがすべてハイライトされました。

また、Copy Allボタンを押した結果はこのようになりました。

https://plus.google.com/?gpsrc=ogpy0&tab=wX
https://www.google.co.jp/webhp?tab=ww
https://www.google.co.jp/imghp?hl=ja&tab=wi
https://maps.google.co.jp/maps?hl=ja&tab=wl
https://play.google.com/?hl=ja&tab=w8
https://www.youtube.com/?gl=JP&tab=w1
https://news.google.co.jp/nwshp?hl=ja&tab=wn
https://mail.google.com/mail/?tab=wm
http://www.google.co.jp/intl/ja/options/
https://drive.google.com/?tab=wo
https://www.google.com/calendar?tab=wc
https://translate.google.co.jp/?hl=ja&tab=wT
https://books.google.co.jp/bkshp?hl=ja&tab=wp
http://www.google.co.jp/shopping?hl=ja&tab=wf
https://photos.google.com/?tab=wq
http://video.google.co.jp/?hl=ja&tab=wv
https://docs.google.com/document/?usp=docs_alc
http://www.google.co.jp/intl/ja/options/
https://accounts.google.com/ServiceLogin?hl=ja&continue=https://www.google.co.jp/%3Fgfe_rd%3Dcr%26ei%3DpLe4VdOQHcGT8QfqmJmoBQ%26gws_rd%3Dssl
http://www.google.co.jp/preferences?hl=ja
https://www.google.co.jp/preferences?hl=ja
https://www.google.co.jp/advanced_search?hl=ja
https://www.google.co.jp/language_tools?hl=ja
http://www.google.co.jp/history/optout?hl=ja
https://www.google.co.jp/webhp?hl=ja
https://www.google.co.jp/support/websearch/bin/answer.py?answer=186645&form=bb&hl=ja
https://www.google.co.jp/intl/ja/policies/privacy/?fg=1
https://www.google.co.jp/intl/ja/policies/terms/?fg=1
https://www.google.co.jp/preferences?hl=ja
https://www.google.co.jp/preferences?hl=ja&fg=1
https://www.google.co.jp/advanced_search?hl=ja&fg=1
https://www.google.co.jp/history/optout?hl=ja&fg=1
https://support.google.com/websearch/?p=ws_results_help&hl=ja&fg=1
https://www.google.com/?gfe_rd=cr&ei=pLe4VdOQHcGT8QfqmJmoBQ&gws_rd=ssl,cr&fg=1
https://www.google.co.jp/intl/ja/ads/?fg=1
https://www.google.co.jp/services/?fg=1
https://www.google.co.jp/intl/ja/about.html?fg=1

このように、各URLが改行区切りでクリップボードにコピーされます。Googleのトップページは閲覧環境によって違うので、同じ結果にはならないかもしれません。

Editボタンはプロファイルの設定をフォームに貼り付けた上でプロファイルを削除するボタン（なので編集後保存しないと消えます）、Deleteボタンはプロファイルを削除するボタンです。

プロファイルの削除は基本的に大丈夫なはずですが
内部でプロファイルに乱数でIDを与えてそれをキーに削除しているため、万に一回くらいは他のプロファイルも一緒に消えるかもしれません。
