# JECO Base Website

Ini adalah proyek kloning (clone) mobile yang terinspirasi dari [https://www.jcodonuts.com/](https://www.jcodonuts.com/). Proyek ini terdiri dari 4 bagian utama: client mobile, orchestrator, app, dan user. Dokumen ini akan memberikan panduan instalasi dan penggunaan proyek ini.

## Langkah

Sebelum Anda dapat menjalankan server, pastikan Anda sudah menyiapkan lingkungan pengembangan dan mengikuti langkah-langkah berikut:

1. **Instalasi Package**: Pertama-tama, instal semua paket yang diperlukan. Buka terminal Anda dan jalankan perintah berikut:

   ```
     npm install
   ```

2. **Running Seeding**: Jalankan seeding terlebih dahulu pada folder seeder:

   ### user

   ```
     node seerder/users.js
   ```

   ### app

   ```
     npx sequelize-cli db:seed:all
   ```

   - **Note** : perlu di ingat anda perlu mengganti authorId dengan hasil id dari user id yang diberikan.

3. **Running App**: Jalankan setiap aplikasi:

   ```
     npm start
   ```

4. **Running NGROK**: karena server masih berada di localhost maka harus diakukan ngrok, agar api dapat di akses oleh public.

   ```
     npx ngrok http  http://localhost:4000/
   ```

5. **Running App Mobile**: Jalankan app mobile, disarakan menggunakan apps expo

   ```
     npm start
   ```

   - **Note** : ketika **a** apabila anda menjalankannya dengan android

## REST API

Di karnakan sudah mengguakan apollo client, anda dapat melihatnya langsung di http://localhost:4000/ atau dari hasil https dari output ngrok.

### Berikut cotoh dari graphql yang tersedia

**Get All Categories** :

```graphql
query {
  allCategory {
    id
    name
  }
}
```

**Get All Items** :

```graphql
query {
  allItem {
    id
    name
    description
    price
    imgUrl
    mongoUserId
    categoryId
    Ingredients {
      id
      name
      imageUrl
    }
    Category {
      id
      name
    }
  }
}
```

**Get Item by ID** :

```graphql
query {
  detailItemById(id: "1") {
    id
    name
    description
    price
    imgUrl
    mongoUserId
    categoryId
    Ingredients {
      id
      name
      imageUrl
    }
    Category {
      id
      name
    }
  }
}
```

**Post Category** :

```graphql
mutation {
  postCategory(name: "New Category") {
    id
    name
  }
}
```

**Delete Category** :

```graphql
mutation {
  deleteCategory(id: 2) {
    message
  }
}
```

**Post Item** :

```graphql
mutation {
  postItem(
    name: "New Item",
    description: "Description for New Item",
    price: 29.99,
    imgUrl: "https://example.com/new-item.jpg",
    mongoUserId: "user456",
    category: 1,
    ingredients: [
      {
        name: "New Ingredient 1",
        imageUrl: "https://example.com/new-ingredient1.jpg"
      },
      // ... (additional ingredients if needed)
    ]
  ) {
    id
    name
    description
    price
    imgUrl
    mongoUserId
    categoryId
    Ingredients {
      id
      name
      imageUrl
    }
    Category {
      id
      name
    }
  }
}
```

**Update Item** :

```graphql
mutation {
  updateItem(
    id: "1",
    name: "Updated Item 1",
    description: "Updated Description for Item 1",
    price: 39.99,
    imgUrl: "https://example.com/updated-item1.jpg",
    mongoUserId: "user123",
    category: 2,
    ingredients: [
      {
        id: "101",
        name: "Updated Ingredient 1",
        imageUrl: "https://example.com/updated-ingredient1.jpg"
      },
      // ... (additional ingredients if needed)
    ]
  ) {
    id
    name
    description
    price
    imgUrl
    mongoUserId
    categoryId
    Ingredients {
      id
      name
      imageUrl
    }
    Category {
      id
      name
    }
  }
}
```

**Delete Item** :

```graphql
mutation {
  deleteItem(id: "2") {
    message
  }
}
```

Terima kasih telah menggunakan JECO Base Mobile! Semoga proyek ini berguna dalam pengembangan Project Anda. Jika Anda memiliki pertanyaan atau masalah, jangan ragu untuk menghubungi kami.