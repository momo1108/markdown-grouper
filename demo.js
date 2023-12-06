const {parse} = require("marked");
const prettify = require("html-prettify");

const html = parse(`
# First
> say hi to my friends

- one
- two

myFoot[^fn1]

[^fn1]: fwenioqwnf

## Second

### Third

#### Fourth

##### Fifth

###### Sixth

####### Seventh

# second paragraph
## second subtitle
fewoainfaiwnf

# third
`);

const html2 = parse(`
# 패키지 만들기
Node.js 패키지을 직접 만들어보자.

---

## 1. git 연동
\`\`\`bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:github계정/git레포.git
git push -u origin main
\`\`\`
> \`.gitignore\` 를 활용해서 개인정보의 유출을 방지하자.
{: .prompt-warning }

> github 계정 연동 관련해서 ssh 연결 설정 도중에, key 관련 문제가 발생했다.
> ssh key 등록을 repo 에도 가능하고 계정 자체에도 가능한데, repo에 등록한 키는 다른곳에 중복 사용이 불가능하다.
> 그래서 계정에 등록을 하려고 봤더니 이미 삭제한 repo에서 사용중이라 뜨더라. 쩔수없이 새로 만들고 등록하기로 했다.
> 해당 내용은 포스트 [github 계정 ssh key 설정](/posts/github-계정-ssh-key-설정/) 참조
{: .prompt-danger }

> 알고보니 ssh 문제보단 뭔가 public 레포 문제인가?
>
> You do not have permission to push to on Github. Would you like to create a fork and push to it instead? 요런 메시지
>
> 수많은 시도를 해보고 찾아낸 방법 : 이번에 계정에 설정한 ssh key 는 ed255뭐시기 알고리즘이었는데, 그냥 기존 key들 다 지우고, rsa key 새로 만들어서 계정에 등록하고 다시 시도해보았다.(\`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"\`)
>
> 그랬더니 되네 ㅡ,.ㅡ 여러모로 열받는다.(windows credentials 에서 git 관련 다 지우고 vscode에서 다시 로그인하기는 함.)
{: .prompt-danger }

## 2. \`package.json\` 파일 생성
1. 프로젝트 폴더에서 \`npm init\` 실행
- scoped modules : \`npm init --scope=@scope-name\`
- unscoped modules : \`npm init\`
2. 필수 항목 작성
- name : 패키지 이름
- version : 초기 패키지 버전
3. 선택 항목 작성
- description : 패키지 설명
- entry point : 패키지가 사용될 때 로드시킬 파일(기본값 index.js)
- test command : npm test 사용 시 실행될 command
- git repository : 패키지의 git repo
- keywords : 검색에 도움이 되는 키워드 지정
- author : 제작자
`)

// console.log(html);

let level = 3;
const pattern = new RegExp(`<h[${Array.from(Array(level), (_, index)=>index+1).join("")}]>`, "g");
const pattern2 = new RegExp(`<h3>.+</h3>`, "g");

const result = pattern2.exec(html);

// console.log([...html.matchAll(pattern)]);
// console.log(result);
// console.log(new RegExp(`<h3>.+</h3>`, "g").exec(html));
// console.log(html.slice(result.index));

function findHeader(text, level, order, prevLabel) {
    if(level > 6) return text;

    const levelString = Array.from(Array(level), (_, index)=>index+1).join("");
    // const startPattern =  new RegExp(`<h${level}>.+</h${level}>`, "g")
    // const endPattern = new RegExp(`<h[${levelString}]>.+</h[${levelString}]>`, "g");

    let start = new RegExp(`<h${level}>.+</h${level}>`, "g").exec(text);

    // 처음 해당 레벨이 존재하는가?
    if(start){
        let endCheck = new RegExp(`<h[${levelString}]>.+</h[${levelString}]>`, "g").exec(text.slice(start.index + 4));
        let end = endCheck? endCheck.index + 4 : text.length;

        // console.log(endCheck?text.slice(endCheck.index):null);
    
        let textBeforeStart, textFromStartToEnd, textAfterEnd;
    
        while(start) {
            if(order===1){
                textBeforeStart = text.slice(0, start.index);
                textFromStartToEnd = text.slice(start.index, end);
                textAfterEnd = text.slice(end);
            } else {
                textBeforeStart = textAfterEnd.slice(0, start.index);
                textFromStartToEnd = textAfterEnd.slice(start.index, end);
                textAfterEnd = textAfterEnd.slice(end);
            }

            console.log("===============", level, order, prevLabel, "================");
            console.log("before)\n",textBeforeStart);
            console.log("between)\n",textFromStartToEnd);
            console.log("after)\n",textAfterEnd);
            console.log(endCheck);
    
            const curLabel = `${prevLabel}_h${level}-${order}`;
            const content = findHeader(textFromStartToEnd, level+1, 1, curLabel);
    
            if(order===1){
                text = `${textBeforeStart}<section id="${curLabel}">
${content}</section>`
            } else {
                text = `${text}
${textBeforeStart}<section id="${curLabel}">
${content}</section>`
            }
    
            order++;
            start = new RegExp(`<h${level}>.+</h${level}>`, "g").exec(textAfterEnd);
            endCheck = new RegExp(`<h[${levelString}]>.+</h[${levelString}]>`, "g").exec(textAfterEnd.slice(start+4));
            end = endCheck? endCheck.index : text.length;
        }
    
        text = `${text}
${textAfterEnd}`;
    } else {
        text = findHeader(text, level+1, 1, prevLabel);
    }

    return text;
}

let markdown = findHeader(html2, 1, 1, "");
markdown = prettify(markdown);

console.log("\n\n\n\n********************************");
console.log(markdown);
console.log("********************************");

let testtxt = `<h1>패키지 만들기</h1>
<p>Node.js 패키지을 직접 만들어보자.</p>
<hr>
<h2>1. git 연동</h2>
<pre><code class="language-bash">git init
git add .
git commit -m &quot;first commit&quot;
git branch -M main
git remote add origin git@github.com:github계정/git레포.git
git push -u origin main
</code></pre>
<blockquote>
<p><code>.gitignore</code> 를 활용해서 개인정보의 유출을 방지하자.
{: .prompt-warning }</p>
</blockquote>
<blockquote>
<p>github 계정 연동 관련해서 ssh 연결 설정 도중에, key 관련 문제가 발생했다.
ssh key 등록을 repo 에도 가능하고 계정 자체에도 가능한데, repo에 등록한 키는 다른곳에 중복 사용이 불가능하다.
그래서 계정에 등록을 하려고 봤더니 이미 삭제한 repo에서 사용중이라 뜨더라. 쩔수없이 새로 만들고 등록하기로 했다.
해당 내용은 포스트 <a href="/posts/github-%EA%B3%84%EC%A0%95-ssh-key-%EC%84%A4%EC%A0%95/">github 계정 ssh key 설정</a> 참조
{: .prompt-danger }</p>
</blockquote>
<blockquote>
<p>알고보니 ssh 문제보단 뭔가 public 레포 문제인가?</p>
<p>You do not have permission to push to on Github. Would you like to create a fork and push to it instead? 요런 메시지</p>
<p>수많은 시도를 해보고 찾아낸 방법 : 이번에 계정에 설정한 ssh key 는 ed255뭐시기 알고리즘이었는데, 그냥 기존 key들 다 지우고, rsa key 새로 만들어서 계정에 등록하고 다시 시도해보았다.(<code>ssh-keygen -t rsa -b 4096 -C &quot;your_email@example.com&quot;</code>)</p>
<p>그랬더니 되네 ㅡ,.ㅡ 여러모로 열받는다.(windows credentials 에서 git 관련 다 지우고 vscode에서 다시 로그인하기는 함.)
{: .prompt-danger }</p>
</blockquote>
<h2>2. <code>package.json</code> 파일 생성</h2>
<ol>
<li>프로젝트 폴더에서 <code>npm init</code> 실행</li>
</ol>
<ul>
<li>scoped modules : <code>npm init --scope=@scope-name</code></li>
<li>unscoped modules : <code>npm init</code></li>
</ul>
<ol start="2">
<li>필수 항목 작성</li>
</ol>
<ul>
<li>name : 패키지 이름</li>
<li>version : 초기 패키지 버전</li>
</ul>
<ol start="3">
<li>선택 항목 작성</li>
</ol>
<ul>
<li>description : 패키지 설명</li>
<li>entry point : 패키지가 사용될 때 로드시킬 파일(기본값 index.js)</li>
<li>test command : npm test 사용 시 실행될 command</li>
<li>git repository : 패키지의 git repo</li>
<li>keywords : 검색에 도움이 되는 키워드 지정</li>
<li>author : 제작자</li>
</ul>`;

console.log(new RegExp(`<h[${Array.from(Array(2), (_, index)=>index+1).join("")}]>`, "g").exec(testtxt))

console.log(testtxt.slice(1170));

console.log(testtxt.slice(4).match(new RegExp(`<h[${Array.from(Array(2), (_, index)=>index+1).join("")}]>`, "g")));