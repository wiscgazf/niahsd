## webpack-demo 

_作者：好棒的身材 ~_

#### 概述  

~~~
项目是通过webpack5.0构建的多页应用，主要作用是提项目开发效率，规范代码，该项目使用React开发，代码编写可直接像平时的单页React一样 ~
~~~

#### 项目启动
~~~
1、 先生成dll 包 加快构建速度 yarn build:dll （此dll包含 react、react-dom、lodash）其他可自行配置
2、 yarn serve 

yarn build:test test环境
yarn build:prod 预发环境
yarn build:live 生产环境
~~~

#### 项目结构说明
```
+ config
    - dev.js    开发环境webpack配置
    - prod.js   生产环境webpack配置
    - test.js   测试环境webpack配置
    - webpack.config.js   webpack通用配置
    
+ public 公共html模板文件，多页不用此文件 暂作（单页）预留

+ src
    + assets       公共资源
        - image    图片资源
        - js       外部js （一般用不着，不排除可能）
        - font     字体包 
        
    - components   公共组件
    
    + pages    页面
        + index
            - index.html
            - index.(less | scss)
            - index.js
```

#### Tips
```
page文件下 每个页面都是一个文件夹，文件夹下面都应有三个文件，分别是 file.html、file.scss、file.js
```

