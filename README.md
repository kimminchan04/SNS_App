SNS_App

Node.js와 Express 기반의 SNS 웹입니다.  
회원가입, 로그인, 게시글 작성, 해시태그, 카카오 OAuth 로그인 등 SNS 핵심 기능을 학습하고 구현한 프로젝트입니다.

1. 주요 기능

- **회원 인증**: 로컬 로그인(Passport Local) + 카카오 OAuth(Passport Kakao)
- **게시글**: 글 작성, 이미지 업로드(Multer), 해시태그 연동
- **사용자**: 프로필 및 팔로우
- **세션**: Express Session + Cookie 기반 로그인 유지

2. 기술 스택

| 구분 | 기술 |
|------|------|
| Runtime | Node.js |
| Framework | Express 5 |
| Template | Nunjucks |
| ORM | Sequelize |
| Database | MySQL |
| Auth | Passport (Local, Kakao) |
| 기타 | bcrypt, multer, morgan, dotenv |

3. 프로젝트 구조

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

API / 라우트 개요

| 경로 | 설명 |
|------|------|
| `/` | 메인·타임라인 페이지 |
| `/auth/*` | 회원가입, 로그인, 카카오 OAuth |
| `/post/*` | 게시글 CRUD |
| `/user/*` | 사용자 관련 API |

MIT
