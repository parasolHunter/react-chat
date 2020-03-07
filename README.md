#####本地开发
### npm install -g create-react-app
### create-react-app my-app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In the project directory, you can run:
### cd my-app
## npm包管理工具
### `npm start` 启动开发环境
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### `npm test`  启动测试环境
### `npm build` 打包生产环境
### `npm eject` 暴露config

## yarn工具
### `yarn start` 启动开发环境
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### `yarn test` 启动测试环境
### `yarn build` 打包生产环境
### `yarn eject` 暴露config

### mongo
##cfg配置
# dbPath: D:\MongoDB\data
# path:  D:\MongoDB\log\mongod.log
##根据cfg安装服务
# mongod --config "D:\MongoDB\bin\mongod.cfg" --install
##默认27017端口
# mongod --dbpath D:\MongoDB\data
##自定义27117端口
# mongod --port 27117 --dbpath D:\MongoDB\data

###node
## npm i express
## npm install mongoose --save
## npm i cookie-parser --save 
## npm i body-parser --save 用于接受post参数

###npm package
##npm i axios --save



#####部署上线

### 安装node和npm,express,cookie-parser,body-parser

## 下载Node.js安装包
# wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-x64.tar.xz

## 解压文件
# tar xvf node-v6.9.5-linux-x64.tar.xz

## 创建软链接，您就可以在任意目录下直接使用node和npm命令
# ln -s /root/node-v6.9.5-linux-x64/bin/node /usr/local/bin/node
# ln -s /root/node-v6.9.5-linux-x64/bin/npm /usr/local/bin/npm

## 将该软件安装到其他目录（如：/opt/node/）
# mkdir -p /opt/node/ （创建空目录）
# mv /root/node-v6.9.5-linux-x64/* /opt/node/ （从旧目录移动到新目录）
# rm -f /usr/local/bin/node
# rm -f /usr/local/bin/npm
# ln -s /opt/node/bin/node /usr/local/bin/node
# ln -s /opt/node/bin/npm /usr/local/bin/npm

## cnpm
# npm install -g cnpm --registry=https://registry.npm.taobao.org
# rm -f /usr/local/bin/cnpm
# ln -s /opt/node/bin/cnpm /usr/local/bin/cnpm

## nodemon
# cnpm install -g nodemon
# rm -f /usr/local/bin/nodemon
# ln -s /opt/node/bin/nodemon /usr/local/bin/nodemon

## 查看node、npm版本。
# node -v
# npm -v

## 使用NVM安装多版本 NVM（Node Version Manager）是Node.js的版本管理软件，使您可以轻松在Node.js各个版本间进行切换
## 使用git将源码克隆到本地的~/.nvm目录下，并检查最新版本。
# yum install git
# git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

## 激活NVM
# echo ". ~/.nvm/nvm.sh" >> /etc/profile
# source /etc/profile

## 列出Node.js的所有版本
# nvm list-remote

## 安装多个Node.js版本
# nvm install v6.9.5
# nvm install v12.13.1

## 运行nvm ls查看已安装的Node.js版本，当前使用的版本为v12.13.1 ，运行nvm use v12.13.1切换Node.js版本至v12.13.1。
# nvm ls
# nvm use v12.13.1

###node
## cnpm i express
## cnpm install mongoose --save
## cnpm i cookie-parser --save 
## cnpm i body-parser --save 用于接受post参数
## cnpm i socket.io --save
## cnpm i utility --save

###安装mongodb
## 1.配置MongoDB的yum源
# vim /etc/yum.repos.d/mongodb-org-3.4.repo
#添加以下内容：
[mongodb-org-3.4]  
name=MongoDB Repository  
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/  
gpgcheck=1  
enabled=1  
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
#这里可以修改 gpgcheck=0, 省去gpg验证
# yum makecache      

## 2.安装MongoDB
# yum -y install mongodb-org

## 查看mongo安装位置 :
# whereis mongod
 

## 查看修改配置文件 ：
# vim /etc/mongod.conf

## 3.启动MongoDB 
# systemctl start mongod.service
## 停止mongodb ：
# systemctl stop mongod.service
## 查到mongodb的状态：
# systemctl status mongod.service

## 4.外网访问需要关闭防火墙（关闭firewall）：
##停止firewall
# systemctl stop firewalld.service 
## 禁止firewall开机启动
# systemctl disable firewalld.service 

## 5.启动Mongo shell
##命令：
# mongo 
##查看数据库：
#show dbs
##6.设置mongodb远程访问：
#编辑mongod.conf注释bindIp,并重启mongodb.(这句配置代表只能本机使用，所以需注释)
# vim /etc/mongod.conf
## 重启mongodb使修改生效：
# systemctl restart mongod.service

### 通过pm2启动项目，退出xshell依然能正常访问项目
## 安装pm2，以 -g 全局安装的插件都在 node 安装目录 bin 文件下
# npm install -g pm2

##查看环境变量 
# echo $PATH

## 永久添加环境变量（影响所有用户）
# vim /etc/profile
##在文档最后，添加:
# node
export NODE_HOME=/root/node-v8.9.1-linux-x64
export PATH=$PATH:$NODE_HOME/bin
##按esc退出编辑模式，输入:wq并回车以保存退出

##运行pm2
# source /etc/profile

## pm2 启动项目
# cd /root/chat-app/server
## 启动进程
[root@izwz9e9bjg74ljcpzr7stvz server]
# pm2 start server.js
## 停止进程
[root@izwz9e9bjg74ljcpzr7stvz server]
# pm2 stop server.js
## 查看进程
[root@izwz9e9bjg74ljcpzr7stvz server]
# pm2 list

## 运行以下命令查看是否在监听项目端口
# netstat -tpln


### HTML5 History 模式，刷新页面404，要安装nginx去配置，并且需要用到反向代理避免域名带端口号。
## Nginx 服务器
#上面我们是直接以 node 启动一个服务器，监听 80 端口，这样我们就可以直接以 IP 地址或域名的方式访问，也可以监听其他端口如3000，这样我们就得在地址后加上 : 端口号，显然这样很麻烦，且一般 node 程序基本不监听 80 端口，还可能同时运行几个 node 项目，监听不同的端口，通过二级域名来分别访问。 这里就用到 Nginx 来实现反向代理。（node 利用 node-http-proxy 包也可以实现反向代理，有兴趣自己了解）

# yum install nginx
# /etc/nginx/
# vim nginx.conf
# server {
    listen       3000;  #server端口
    server_name  120.27.95.139; #公网ip
    index index.html;
        location / {
            proxy_pass_header Server;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://127.0.0.1:3000/;
        }
    # 解决刷新500 502 503 504 404的问题						      	  
    error_page   500 502 503 504 404 /index.html;
        location = /50x.html {
            root   html;
    }
}
# nginx 
# nginx -s reload
# ps -ef | grep nginx

##改package.json的 "proxy": "http://120.27.95.139:3000"

### shell指令
# touch xxx.js 创建文件
# vim xxx.js 打开该文件
# 按键盘i进入编辑模式
# 按esc退出编辑模式，输入:wq并回车以保存并关闭文件