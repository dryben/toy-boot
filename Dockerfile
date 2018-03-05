# Node v8.9.0 (LTS)
FROM node:carbon

# 컨테이터 내 워킹 디렉토리
WORKDIR /data/app

# 디펜던시 설치
COPY package*.json ./
RUN npm install
# 소스변경시 재시작을 위해 노드몬 설치
RUN npm install -g nodemon

CMD [ "npm", "start" ]