const _0x38d8cb=_0x26cd;(function(_0x441664,_0x224678){const _0x535055=_0x26cd,_0x53b6ec=_0x441664();while(!![]){try{const _0x2f9f7c=parseInt(_0x535055(0x152))/0x1*(parseInt(_0x535055(0x12d))/0x2)+parseInt(_0x535055(0x134))/0x3*(parseInt(_0x535055(0x13f))/0x4)+parseInt(_0x535055(0x131))/0x5*(parseInt(_0x535055(0x137))/0x6)+parseInt(_0x535055(0x148))/0x7*(parseInt(_0x535055(0x144))/0x8)+parseInt(_0x535055(0x139))/0x9+parseInt(_0x535055(0x12f))/0xa+-parseInt(_0x535055(0x155))/0xb;if(_0x2f9f7c===_0x224678)break;else _0x53b6ec['push'](_0x53b6ec['shift']());}catch(_0x528cb0){_0x53b6ec['push'](_0x53b6ec['shift']());}}}(_0x5373,0x47fce));import{parse}from'marked';import _0x74ee from'@liquify/prettify';import _0x3e56bf from'fs';function _0x5373(){const _0x5c6a98=['>.+</h','337078EkiPta','length','replace','\x22>\x0a','MDGMDGMDGEND','<h[','markdown','&lt;h','\x0a\x20\x20\x20\x20','from','1tEbBDQ','index','class','13008116tBkTLI','MDGMDGMDGHEADER','\x20\x20\x20','push','html','\x22\x20is\x20invalid\x20name\x20for\x20a\x20selector.','join','</h','555554zeiHGO','slice','2561390DCpyUN','innerText','12575BbArQF','MDGMDGMDGSTART','level','3rrfuLm','<section\x20','</section>','438JiuxIe','log','4370310LQZVTd','children','pushChild','%%%%%%ERROR%%%%%','includes','formatSync','326804XbGLmz',']>.+</h[','exec','setDocument','green','32wrtStl','replaceAll','toLowerCase'];_0x5373=function(){return _0x5c6a98;};return _0x5373();}import _0x49f93f from'chalk';class HeaderComponent{#level=0x1;#innerText='';#children=[];constructor(_0x1415e2,_0x2efa80){this.#level=_0x1415e2,this.#innerText=_0x2efa80;}[_0x38d8cb(0x13b)](_0x2bbae4){const _0x433936=_0x38d8cb;this.#children[_0x433936(0x158)](_0x2bbae4);}get[_0x38d8cb(0x133)](){return this.#level;}get[_0x38d8cb(0x130)](){return this.#innerText;}get['children'](){return this.#children;}}class MarkdownDocument{#roots=[];#markdown='';#html='';#cli=!0x1;constructor(){}['setDocument'](_0x215d61,_0x37e0be,_0x396d54=0x1,_0x4ae8d7=0x1,_0x526912='',_0x48c07c='id',_0x383821='_',_0x3efb57='-',_0x4d3161=!0x1){const _0x380e90=_0x38d8cb;_0x215d61&&(_0x37e0be=_0x3e56bf['readFileSync'](_0x37e0be)['toString']()),this.#cli=_0x4d3161,this.#markdown=_0x37e0be,this.#roots=[],_0x37e0be=this.#encodeHeaderTag(_0x37e0be),(_0x215d61=parse(_0x37e0be),_0x4d3161=_0x74ee[_0x380e90(0x13e)](this.#findHeader(_0x215d61,_0x396d54,_0x4ae8d7,_0x526912,_0x48c07c,_0x383821,_0x3efb57,null),{'language':_0x380e90(0x159),'indentSize':0x2})),this.#html=_0x74ee[_0x380e90(0x13e)](this.#decodeHeaderTag(_0x4d3161),{'language':_0x380e90(0x159),'indentSize':0x2});}get[_0x38d8cb(0x14e)](){return this.#markdown;}get[_0x38d8cb(0x159)](){return this.#html;}['showHeaderTree'](){const _0x34e6d4=_0x38d8cb;let _0x303b76='';for(let _0x5011e4=0x0;_0x5011e4<this.#roots[_0x34e6d4(0x149)];_0x5011e4++)_0x303b76+=this.#treeSearch(this.#roots[_0x5011e4],[]);return _0x303b76=_0x303b76[_0x34e6d4(0x14a)](/\n$/,''),console[_0x34e6d4(0x138)](_0x303b76),_0x303b76;}#treeSearch(_0xc3232,_0x51cd66){const _0x170a6f=_0x38d8cb;let _0x355ee4=_0x51cd66['reduce']((_0x583732,_0x296efc,_0x4c20fc)=>_0x4c20fc===_0x51cd66['length']-0x1?_0x583732+(_0x296efc?'\x20\x20└':'\x20\x20├'):_0x583732+(_0x296efc?_0x170a6f(0x157):'\x20\x20│'),'')+((this.#cli?_0x49f93f[_0x170a6f(0x143)](_0xc3232[_0x170a6f(0x130)]):_0xc3232['innerText'])+'\x0a');for(let _0x26a1e2=0x0;_0x26a1e2<_0xc3232[_0x170a6f(0x13a)][_0x170a6f(0x149)];_0x26a1e2++){var _0x4cab49=_0x26a1e2===_0xc3232[_0x170a6f(0x13a)][_0x170a6f(0x149)]-0x1;_0x355ee4+=this.#treeSearch(_0xc3232[_0x170a6f(0x13a)][_0x26a1e2],[..._0x51cd66,_0x4cab49]);}return _0x355ee4;}#encodeHeaderTag(_0x5c91b2){const _0x244cff=_0x38d8cb;for(let _0x43e7a7=0x1;_0x43e7a7<0x7;_0x43e7a7++){var _0x3bfc64=new RegExp('<h'+_0x43e7a7,'g'),_0x4cf862=new RegExp(_0x244cff(0x12c)+_0x43e7a7,'g');_0x5c91b2=(_0x5c91b2=_0x5c91b2[_0x244cff(0x145)](_0x3bfc64,'MDGMDGMDGHEADER'+_0x43e7a7+_0x244cff(0x132)))[_0x244cff(0x145)](_0x4cf862,_0x244cff(0x156)+_0x43e7a7+_0x244cff(0x14c));}return _0x5c91b2;}#decodeHeaderTag(_0x200aa7){const _0x2f3183=_0x38d8cb;for(let _0x370421=0x1;_0x370421<0x7;_0x370421++){var _0x8838cd=new RegExp(_0x2f3183(0x156)+_0x370421+_0x2f3183(0x132),'g'),_0x3d7b9d=new RegExp(_0x2f3183(0x156)+_0x370421+_0x2f3183(0x14c),'g');_0x200aa7=(_0x200aa7=_0x200aa7['replaceAll'](_0x8838cd,_0x2f3183(0x14f)+_0x370421))[_0x2f3183(0x145)](_0x3d7b9d,'&lt;/h'+_0x370421);}return _0x200aa7;}#findHeader(_0xef108e,_0x2731b6,_0x54bbe5,_0x41a38c,_0x4972d0,_0x375b89,_0x41d811,_0x56b7d1){const _0x5aed0a=_0x38d8cb;if(!(0x6<_0x2731b6)){var _0x30fdab=Array[_0x5aed0a(0x151)](Array(_0x2731b6),(_0x794cb7,_0x54d3b5)=>_0x54d3b5+0x1)[_0x5aed0a(0x15b)]('');try{let _0xf26a6c=new RegExp('<h'+_0x2731b6+_0x5aed0a(0x147)+_0x2731b6+'>','g')[_0x5aed0a(0x141)](_0xef108e);if(_0xf26a6c){let _0x5e011a=new RegExp(_0x5aed0a(0x14d)+_0x30fdab+_0x5aed0a(0x140)+_0x30fdab+']>','g')[_0x5aed0a(0x141)](_0xef108e['slice'](_0xf26a6c['index']+0x4)),_0x589f0e=_0x5e011a?_0xf26a6c[_0x5aed0a(0x153)]+_0x5e011a[_0x5aed0a(0x153)]+0x4:_0xef108e['length'],_0x2b9e25,_0x1ab9f3,_0x84e5d1;for(;_0xf26a6c;){_0x84e5d1=(0x1===_0x54bbe5?(_0x2b9e25=_0xef108e['slice'](0x0,_0xf26a6c['index']),_0x1ab9f3=_0xef108e[_0x5aed0a(0x12e)](_0xf26a6c[_0x5aed0a(0x153)],_0x589f0e),_0xef108e):(_0x2b9e25=_0x84e5d1[_0x5aed0a(0x12e)](0x0,_0xf26a6c[_0x5aed0a(0x153)]),_0x1ab9f3=_0x84e5d1[_0x5aed0a(0x12e)](_0xf26a6c[_0x5aed0a(0x153)],_0x589f0e),_0x84e5d1))['slice'](_0x589f0e);var _0x5be3d3=new HeaderComponent(_0x2731b6,_0xf26a6c[0x0]),_0x3ccf43=(_0x56b7d1?_0x56b7d1['pushChild'](_0x5be3d3):this.#roots[_0x5aed0a(0x158)](_0x5be3d3),''+_0x41a38c+_0x375b89+'h'+_0x2731b6+_0x41d811+_0x54bbe5),_0x402069=this.#findHeader(_0x1ab9f3,_0x2731b6+0x1,0x1,_0x3ccf43,_0x4972d0,_0x375b89,_0x41d811,_0x5be3d3);_0xef108e=0x1===_0x54bbe5?_0x2b9e25+(_0x5aed0a(0x135)+_0x4972d0+'=\x22'+_0x3ccf43+_0x5aed0a(0x14b)+_0x402069+_0x5aed0a(0x136)):_0xef108e+'\x0a'+_0x2b9e25+_0x5aed0a(0x135)+_0x4972d0+'=\x22'+_0x3ccf43+_0x5aed0a(0x14b)+_0x402069+_0x5aed0a(0x136),_0x54bbe5++,_0xf26a6c=new RegExp('<h'+_0x2731b6+_0x5aed0a(0x147)+_0x2731b6+'>','g')[_0x5aed0a(0x141)](_0x84e5d1),_0x5e011a=_0xf26a6c?new RegExp(_0x5aed0a(0x14d)+_0x30fdab+_0x5aed0a(0x140)+_0x30fdab+']>','g')[_0x5aed0a(0x141)](_0x84e5d1['slice'](_0xf26a6c[_0x5aed0a(0x153)]+0x4)):null,_0x589f0e=_0x5e011a?_0xf26a6c[_0x5aed0a(0x153)]+_0x5e011a[_0x5aed0a(0x153)]+0x4:_0x84e5d1['length'];}_0xef108e=_0xef108e+_0x5aed0a(0x150)+_0x84e5d1;}else _0xef108e=this.#findHeader(_0xef108e,_0x2731b6+0x1,0x1,_0x41a38c,_0x4972d0,_0x375b89,_0x41d811,_0x56b7d1);}catch(_0x499787){console[_0x5aed0a(0x138)](_0x5aed0a(0x13c)),console[_0x5aed0a(0x138)](minLevel,_0x54bbe5,_0x499787);}}return _0xef108e;}}let markdownDoc=new MarkdownDocument();function _0x26cd(_0x3a557c,_0x584c6c){const _0x5373c5=_0x5373();return _0x26cd=function(_0x26cdac,_0x29b136){_0x26cdac=_0x26cdac-0x12c;let _0x1c75df=_0x5373c5[_0x26cdac];return _0x1c75df;},_0x26cd(_0x3a557c,_0x584c6c);}const parseToGroup=(_0x45ea4a,_0x203b11=0x1,_0x3fa783='id',_0x3474e7='_',_0x5d1c6b='-')=>{const _0x1d8103=_0x38d8cb;if(_0x3fa783=_0x3fa783[_0x1d8103(0x146)](),['id',_0x1d8103(0x154)][_0x1d8103(0x13d)](_0x3fa783[_0x1d8103(0x146)]()))return(markdownDoc=markdownDoc||new MarkdownDocument())[_0x1d8103(0x142)](!0x1,_0x45ea4a,_0x203b11,0x1,'',_0x3fa783,_0x3474e7,_0x5d1c6b),markdownDoc['html'];throw new Error('\x22'+_0x3fa783+_0x1d8103(0x15a));},parseFileToGroup=(_0x305ef2,_0x254a8d=0x1,_0x5a7519='id',_0x44a232='_',_0x1fbe02='-')=>{const _0x17ceca=_0x38d8cb;if(_0x5a7519=_0x5a7519[_0x17ceca(0x146)](),['id',_0x17ceca(0x154)]['includes'](_0x5a7519))return(markdownDoc=markdownDoc||new MarkdownDocument())['setDocument'](!0x0,_0x305ef2,_0x254a8d,0x1,'',_0x5a7519,_0x44a232,_0x1fbe02),markdownDoc[_0x17ceca(0x159)];throw new Error('\x22'+_0x5a7519+_0x17ceca(0x15a));};export{MarkdownDocument,markdownDoc,parseToGroup,parseFileToGroup};