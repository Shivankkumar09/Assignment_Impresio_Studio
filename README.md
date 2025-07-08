# 📸 Pixisphere – Photographer Directory App

A responsive photographer directory web app built with:

- **Next.js (App Router)**
- **Redux Toolkit**
- **Tailwind CSS**
- **JSON Server (for mock backend)**

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pixisphere.git
   cd pixisphere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend (Next.js):**
   ```bash
   npm run dev
   ```

4. **Setup JSON Server (Mock API):**
   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3001
   ```

   The mock API will be available at:  
   👉 `http://localhost:3001/photographers`

---

## 📂 Folder Structure

```
/app
  ├── layout.tsx
  ├── page.tsx (Main Home Page)
  ├── photographer/[id]/page.tsx (Photographer Details Page)
  
/components
  ├── PhotographerCard.tsx

/redux
  ├── store.ts
  ├── photographerSlice.ts

/utils
  └── debounce.ts

/public
  └── *images*
```

---

## 🔍 Filtering, Debounce & Logic

### 📌 Filters Used

- **Search bar**: Filters by name, location, or tags.
- **City**: Dropdown filter.
- **Rating**: Minimum rating via range slider.
- **Styles**: Optional (extendable).
- **Sort By**:
  - Price: Low to High
  - Rating: High to Low
  - Recently Added

---

### ⚡ Debounce Logic (Search)

```ts
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
```

#### 📘 What is Debouncing?

Debouncing is a **performance optimization technique** used to limit the rate at which a function (like an API call or event handler) is executed.

> 💡 **Real-world example**: When typing in a search bar, without debouncing, every keystroke could trigger a new API call. Debouncing waits for the user to stop typing before firing the request.

#### ✅ Why use Debounce in Search?

- Reduces unnecessary network requests.
- Improves performance and user experience.
- Avoids spamming the backend with frequent calls.

#### ⏱️ Key Principle

Only execute the function **after a certain idle period** (e.g., 300ms) has passed since the last input.

---

### 🔄 Filtering Logic (Simplified)

```ts
let result = [...allPhotographers];

if (filters.city)
  result = result.filter((p) => p.location === filters.city);

if (filters.rating)
  result = result.filter((p) => p.rating >= filters.rating);

if (filters.search)
  result = result.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))
  );
```

---

## 🧪 Sample API Response (JSON Server)

```json
{
  "id": 1,
  "name": "Ravi Studio",
  "location": "Bengaluru",
  "price": 10000,
  "rating": 4.6,
  "styles": ["Outdoor", "Studio"],
  "tags": ["Candid", "Maternity"],
  "bio": "Award-winning studio specializing in maternity and newborn shoots.",
  "profilePic": "/ravi.jpg",
  "portfolio": ["/ravi.jpg", "/portfolio1.jpg"],
  "reviews": [
    {
      "name": "Ananya",
      "rating": 5,
      "comment": "Truly amazing photos and experience!",
      "date": "2024-12-15"
    }
  ]
}
```

---


## 🔐 Notes for Deployment

- `json-server` is a local-only solution. For production:
  - Either host the data on a real backend (e.g., Node/Express, Firebase, Supabase, etc.)
  

---

## 🙌 Author

Made with ❤️ by **Shivank Kumar**  
📧 Reach out: [LinkedIn](https://www.linkedin.com/in/shivank-kumar-17a884254/) | [GitHub](https://github.com/Shivankkumar09)

---
