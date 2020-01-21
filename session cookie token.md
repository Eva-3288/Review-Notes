# 关于session cookie token

## 1、为什么会有session 、 cookie 、 token的出现？
http是一个无状态协议：即这次请求和上一次请求是没有任何关系和关联的，互不认识的。这种无状态的好处是快速，坏处是如果我们要想让同一域名下的不同页面关联起来，共享某些数据，是要使用某些手段和工具的；
如上：由于http的无状态性，为了使某个域名下的所有网页可以共享某些数据，session 和 cookie出现了。





## 总结：
1、session 存在服务器上，但session拥有一个唯一的识别符号sessionId，这个sessionId一般存放在cookie中。服务器接收到cookie后，解析出sessionId，再去session 列表中查找，才能找到相应的session。所以session 依赖 cookie。session类似一个状态列表。
2、cookie 类似一个令牌，装有sessionId,存在客户端上，浏览器通常会自动添加。
3、token也类似一个令牌，无状态，用户信息都被加密到token中，服务器收到token解密后就可以知道是哪个用户了。需要开发者手动添加。

参考文章：
彻底弄懂session，cookie，token ： https://segmentfault.com/a/1190000017831088
简单聊聊Cookie 和 Session #前端#  ： https://www.jianshu.com/p/4f3b683afa4c
Cookie和session应该这样理解 ： https://zhuanlan.zhihu.com/p/59307179
