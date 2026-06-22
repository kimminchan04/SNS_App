# SNS_App

Node.js와 Express 기반의 SNS(소셜 네트워크) 웹 애플리케이션입니다.  
회원가입·로그인, 게시글 작성, 해시태그, 카카오 OAuth 로그인 등 SNS 핵심 기능을 학습·구현한 프로젝트입니다.

## 주요 기능

- **회원 인증**: 로컬 로그인(Passport Local) + 카카오 OAuth(Passport Kakao)
- **게시글**: 글 작성, 이미지 업로드(Multer), 해시태그 연동
- **사용자**: 프로필 및 팔로우 관련 API
- **세션**: Express Session + Cookie 기반 로그인 유지

## 기술 스택

| 구분 | 기술 |
|------|------|
| Runtime | Node.js |
| Framework | Express 5 |
| Template | Nunjucks |
| ORM | Sequelize |
| Database | MySQL |
| Auth | Passport (Local, Kakao) |
| 기타 | bcrypt, multer, morgan, dotenv |

## 프로젝트 구조

```
SNS_App/
├── app.js              # Express 앱 진입점 (포트 8001)
├── config/             # DB 설정 (Sequelize)
├── controller/         # 비즈니스 로직
├── middleware/         # 미들웨어
├── models/             # User, Post, Hashtag 모델
├── passport/           # Passport 인증 설정
├── routes/             # page, auth, post, user 라우터
├── views/              # Nunjucks 템플릿
├── public/             # 정적 파일
└── uploads/            # 업로드 이미지
```

## 실행 방법

### 1. 사전 준비

- Node.js 18+
- MySQL 설치 및 실행
- (선택) [카카오 Developers](https://developers.kakao.com/) 앱 등록

### 2. 데이터베이스 설정

MySQL에 데이터베이스를 생성합니다.

```sql
CREATE DATABASE snsdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

`config/config.json`의 `development` 항목에 MySQL 접속 정보를 입력합니다.

> ⚠️ DB 비밀번호 등 민감 정보는 Git에 커밋하지 마세요.

### 3. 환경 변수

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
PORT=8001
COOKIE_SECRET=your_cookie_secret
KAKAO_ID=your_kakao_rest_api_key
KAKAO_SECRET=your_kakao_client_secret
KAKAO_CALLBACK_URL=http://localhost:8001/auth/kakao/callback
```

### 4. 설치 및 실행

```bash
npm install
npm start
```

브라우저에서 [http://localhost:8001](http://localhost:8001) 으로 접속합니다.

## API / 라우트 개요

| 경로 | 설명 |
|------|------|
| `/` | 메인·타임라인 페이지 |
| `/auth/*` | 회원가입, 로그인, 카카오 OAuth |
| `/post/*` | 게시글 CRUD |
| `/user/*` | 사용자 관련 API |

## 라이선스

MIT
