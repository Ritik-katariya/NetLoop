# 🎓 College Social Media Platform

A **next-generation social media platform** exclusively for college students with 20+ features designed to enhance both professional and social engagement.  
Built with a modern tech stack, including **real-time messaging, event management, interest-based communities, and content sharing**, optimized for isolated regions with seamless performance and scalability.

---

## 🚀 Features
- 🎓 Exclusive access for college students  
- 💬 Real-time messaging and notifications (Socket.io)  
- 📅 Event management and community features  
- 🎥 Auto-quality video streaming (HLS with Cloudinary)  
- 🔒 Secure authentication (JWT, OAuth)  
- 🗄 Scalable backend with PostgreSQL and Prisma ORM  
- ⚡ Fast API responses with optimized queries  
- 📄 Intelligent PDF reader with semantic search (FAISS + NLP)  

---

## 📂 Repository Structure

```
root
│
├── FE                    # Frontend (React.js, Next UI, Redux Toolkit, Tailwind CSS)
│
└── BE                    # Backend (Node.js, Express, Prisma, Socket.io, PostgreSQL)
```

---

## 🖥 Tech Stack

### Frontend (FE)
- **React.js** (v18)  
- **Next UI** & **Tailwind CSS**  
- **Redux Toolkit** & **Axios**  
- **Socket.io Client**  
- **HLS.js** (video streaming)  
- **Ant Design** & **Hero UI Components**  

### Backend (BE)
- **Node.js** & **Express**  
- **Prisma ORM** with **PostgreSQL**  
- **Socket.io** (real-time communication)  
- **Cloudinary** (media storage)  
- **JWT** & **OAuth 2.0** authentication  
- **FAISS Vector DB** & **LangChain** (AI-powered PDF search)  
- **Winston Logger**  

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/college-social-media.git
cd college-social-media
```

### 2️⃣ Setup Backend (BE)

```bash
cd BE
npm install
```



Run database migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the backend server:

```bash
npm run start
```

### 3️⃣ Setup Frontend (FE)

```bash
cd ../FE
npm install
```



Start the frontend:

```bash
npm start
```









## 🚀 Deployment

### Backend Deployment (Hostinger/Railway/Render)
```bash
# Build the project
npm run build

# Start production server
npm run start:prod
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the project
npm run build

# Deploy build folder
```

### Database Migration (Production)
```bash
npx prisma migrate deploy
npx prisma generate
```

---

## 📊 Database Schema


---

## 🎯 Key Features Implementation

### Real-time Messaging


### Video Streaming with HLS


### AI-Powered PDF Search


## 🧪 Testing

```bash
# Backend tests
cd BE
npm test

# Frontend tests  
cd FE
npm test

# E2E tests
npm run test:e2e
```

---

## 📈 Performance Optimization

- **Database Query Optimization**: 30% faster API responses
- **Image Compression**: Cloudinary auto-optimization
- **Caching**: Redis for session management
- **CDN**: Static asset delivery
- **Code Splitting**: React lazy loading

---

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **OAuth 2.0** Google integration
- **Input Validation** with Joi/Yup
- **Rate Limiting** for API endpoints
- **CORS** configuration
- **Helmet.js** security headers

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Ritik Kumar** - Full Stack Developer
- Email: ritikkatariya.dev@gmail.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- GitHub: [Your GitHub](https://github.com/your-username)

---

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Prisma team for the amazing ORM
- Socket.io for real-time capabilities
- Cloudinary for media management
- OpenAI for AI integration

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: ritikkatariya.dev@gmail.com
- Create a discussion in the repository

---

**⭐ Star this repo if you find it helpful!**
