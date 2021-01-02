
# Hypertell server
Hyptertell server

```js
import { Dialog, Server, Article, Selections } from "hypertell-server";

const { Text, Image } = Article;
const { IComboBox, Confirm, Yes } = Selections;

const server = new Server({
    cors: {
        origin: "*"
    }
});


// dialog

const head = new Dialog(server);
head.addArticle(Text("안녕하세요 왜오셨어요"));
head.setSelections(IComboBox(["심심해서요", "JS배우러요", "시발"]));
head.setRedirect(i => ({ dialog:[d1, d2, d3][i] }));

const d1 = new Dialog(server);
d1.addArticle(Image("https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"));
d1.addArticle(Text("심심하면 JS를 하시는게 어떨까요?"));
d1.setSelections(Confirm());
d1.setRedirect(v => v ? { dialog:jsLearn } : { dialog:zotga, then:{ dialog:d1 } });

const zotga = new Dialog(server);
zotga.addArticle(Image("https://summonerstarlighthome.files.wordpress.com/2018/01/tumblr_p2gm011ona1tm1dgio1_540.png?w=1100"));
zotga.addArticle(Text("^^"));
zotga.setSelections(Yes());

const d2 = new Dialog(server);
d2.addArticle(Image("https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"));
d2.addArticle(Text("좋은 생각입니다."));
d2.setSelections(Yes());
d2.setRedirect(() => ({ dialog:jsLearn }));

const d3 = new Dialog(server);
d3.addArticle(Image("https://thumb.mt.co.kr/06/2017/04/2017042815195833895_3.jpg/dims/optimize/"));
d3.setSelections(Confirm());


const jsLearn = new Dialog(server);
jsLearn.addArticle(Text("일단 JS는 최고의 언어입니다."));
jsLearn.setSelections(IComboBox(["동의"]));


//

server.setHead(head);
server.listen(1234);
```