# 关于session cookie token

## 1、为什么会有session 、 cookie 、 token的出现？
由于网络中http协议造成的，因为http是一个无状态协议：即这次请求和上一次请求是没有任何关系和关联的，互不认识的。这种无状态的好处是快速，坏处是如果我们要想让同一域名下的不同页面关联起来，共享某些数据，是要使用某些手段和工具的；
如上：由于http的无状态性，为了使某个域名下的所有网页可以共享某些数据，session 和 cookie出现了。

关于toekn的出现：
session 会在一定时间内保持在服务器上，当访问增多的时候会比较占用服务器的性能。考虑到减轻服务器性能方面，token出现了

## cookie 机制
cookie不是虚无缥缈的东西，cookie是一种存储方式：通过扩展http协议来实现的。
浏览器访问服务器的时候，服务器会在response header中添加 指示浏览器生成cookie的规则，浏览器按照一定的规则在request header中生成cookie 并发送给服务器，服务器校验规则，如果校验通过会一直保持会话。
cookie机制采用的是 在客户端保持状态的方案。

## session机制

session机制采用的是 在服务端保持状态的方案，把数据保存在服务器里。服务器保存的数据会自动生成一个sessionId（也就是我们说的key）给客户端，sessionId通常保存在cookie里，也可以存在URL 、post data里。
下次访问时客户端会把sessionId发送给服务端进行匹配，如果校验通过就保持会话。

## token机制
浏览器第一次访问服务器，会传过来一个唯一标识（比如userid），服务器端会通过一些算法再加一个密钥生成一个token,然后base64编码后将token发送给客户端；  客户端将token保存起来，下次请求服务器是带上token ; 服务器收到请求后，用相同的算法和密钥去验证token,如果通过，执行业务操作，不通过返回不通过信息。

## 对比
session 和 token对比：session是空间换时间，token是时间换空间
1、session直接拿sessionId进行匹配，速度很快。但是需要在服务器上保存数据，访问较多时占用服务器性能。
2、token不会在服务器保存数据，能做到真正的无状态，空间节省了不少。 但是token需要加密解密后再验证步骤，速度相对session会更慢。

举例：session 就像：你第一次访问的时候,我把你的信息都存在我的服务器上，


## 总结：
1、session 存在服务器上，但session拥有一个唯一的识别符号sessionId，这个sessionId一般存放在cookie中。服务器接收到cookie后，解析出sessionId，再去session 列表中查找，才能找到相应的session。所以session 依赖 cookie。session类似一个状态列表。
2、cookie 类似一个令牌，装有sessionId,存在客户端上，浏览器通常会自动添加。
3、token也类似一个令牌，无状态，用户信息都被加密到token中，服务器收到token解密后就可以知道是哪个用户了。需要开发者手动添加。

参考文章：
彻底弄懂session，cookie，token ： https://segmentfault.com/a/1190000017831088
简单聊聊Cookie 和 Session #前端#  ： https://www.jianshu.com/p/4f3b683afa4c
Cookie和session应该这样理解 ： https://zhuanlan.zhihu.com/p/59307179
接口基础cookie， session，token的区别   ： https://blog.csdn.net/qq_34979346/article/details/84797292
