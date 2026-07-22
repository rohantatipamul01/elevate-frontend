# Elevate — frontend

A task/streak tracking app. Home, sign up, and log in pages, structured to plug into a Spring Boot backend.

## File structure

```
elevate-frontend/
├── .env                        # API base URL (REACT_APP_API_BASE_URL)
├── package.json
└── src/
    ├── index.js                # React entry point
    ├── App.jsx                 # Routes (/, /signup, /login)
    ├── api/
    │   └── authService.js      # fetch calls to Spring Boot (/api/auth/signup, /login)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── AscentBar.jsx       # signature staircase visual
    │   ├── FeatureCard.jsx
    │   ├── AuthShell.jsx       # shared card wrapper for signup/login
    │   └── FormControls.jsx    # Field, PasswordInput, SocialButtons, Divider
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── SignupPage.jsx
    │   └── LoginPage.jsx
    └── styles/
        ├── theme.js             # color tokens
        └── global.css           # fonts + base element styles
```

## 1. Create the React project

You need Node.js installed (v18+ recommended). Two common ways to start:

**Option A — Vite (faster, recommended)**
```bash
npm create vite@latest elevate-frontend -- --template react
cd elevate-frontend
```

**Option B — Create React App**
```bash
npx create-react-app elevate-frontend
cd elevate-frontend
```

Either way, once the project exists, **delete the default `src/` contents** and copy in the files from this structure instead (or copy them in alongside, overwriting `App.jsx`/`App.js` and `index.js`).

> Note: if you used Vite, your entry file is `src/main.jsx` instead of `src/index.js` — just rename `index.js` to `main.jsx`, or update `vite.config.js`/`index.html` to point at `index.js`. CRA users can use the files as-is.

## 2. Install dependencies

```bash
npm install react-router-dom lucide-react
```

- `react-router-dom` — page routing between Home / Sign up / Log in
- `lucide-react` — the icon set used throughout (Flame, Trophy, ArrowRight, etc.)

## 3. Set your backend URL

Edit `.env` in the project root:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```
(Vite users: rename the variable to `VITE_API_BASE_URL` and read it via `import.meta.env.VITE_API_BASE_URL` in `authService.js` instead of `process.env`.)

## 4. Run it

```bash
npm run dev      # Vite
# or
npm start         # Create React App
```

---

## Connecting to Spring Boot

`src/api/authService.js` is the only file that talks to your backend. It expects two REST endpoints:

| Method | Endpoint            | Body                                      | Success response       |
|--------|----------------------|--------------------------------------------|--------------------------|
| POST   | `/api/auth/signup`  | `{ name, email, password, dob }`           | `201 Created`            |
| POST   | `/api/auth/login`   | `{ username, password }`                   | `200 OK` + `{ token }`   |

### Minimal Spring Boot side to match this

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // or 5173 for Vite
public class AuthController {

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        // validate + save user, hash password (e.g. BCryptPasswordEncoder)
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // authenticate, then issue a JWT
        String token = jwtService.generateToken(request.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
```

`CrossOrigin` (or a global CORS config) is required since the React dev server and Spring Boot run on different ports.

### Where things plug in

- **Sign up form** (`SignupPage.jsx`) calls `signup(form)` from `authService.js` on submit, shows the backend's error message on failure, and redirects to `/login` on success.
- **Log in form** (`LoginPage.jsx`) calls `login(form)`, stores the returned JWT in `localStorage` (`authService.js` handles this automatically), and redirects to `/dashboard` — point this at your actual post-login route.
- **Google / GitHub buttons** (`FormControls.jsx`, `SocialButtons`) currently just log to console. For real OAuth2 with Spring Boot, replace the `console.log` calls with a redirect to Spring's OAuth2 login endpoint, e.g. `window.location.href = "http://localhost:8080/oauth2/authorization/google"`, after configuring `spring-boot-starter-oauth2-client` with your Google/GitHub client IDs.
- **Authenticated requests** — once a JWT exists, use `getToken()` from `authService.js` to attach it as `Authorization: Bearer <token>` on future API calls (e.g. fetching tasks).

## Design notes

- Palette: dark "ink" background (`#11151C`), amber accent for streaks/achievements, teal for progress — see `src/styles/theme.js`.
- Fonts: Space Grotesk (display/headings) + Inter (body), loaded via Google Fonts in `global.css`.
- The staircase graphic in `AscentBar.jsx` is the one signature visual tying back to "Elevate" — keep it as the focal point if you extend the design.
