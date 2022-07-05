# Kantin Kejujuran

Projek ini dibuat untuk memenuhi website challenge pada event SEA (Software Engineering Academy) 2022. Website yang dibuat merupakan digitalisasi dari proses jual beli yang terjadi pada kantin kejujuran di SD SEA SENTOSA. Pembeli dapat membeli produk, menjual produk, menambahkan dan mengambil uang pada canteen balance. Semua peristiwa/proses di atas dapat dilakukan melalui website yang telah dibuat. 

## Fitur
1. Menambahkan produk untuk dijual pada kantin kejujuran, canteen balance akan otomatis berkurang sesuai harga produk yang ditambahkan
2. Membeli produk di kantin kejujuran, produk yang dibeli akan secara otomatis terhapus dari list produk
3. Menampilkan list produk yang ada pada kantin kejujuran beserta informasi mengenai produk tersebut (nama, harga, deskripsi, gambar)
4. Terdapat informasi mengenai nama, harga, deskripsi, dan gambar pada setiap produk yang dijual
5. Mengurutkan list produk berdasarkan nama produk dan waktu pada saat produk ditambahkan di kantin kejujuran
6. Menambahkan uang pada canteen balance
7. Mengambil uang pada canteen balance
8. Melakukan registrasi, login, dan logout

## Batasan Registrasi
Hanya siswa yang memiliki student id valid yang dapat melakukan registrasi pada website. student id terdiri dari 5 digit angka dari 0-9. dua angka terakhir merupakan hasil penjumlahan dari tiga digit pertama.
Contoh :
  1. 55616
  2. 33410
  3. 11103

## Single Role

Hanya terdapat satu role pada website yang dibuat, yaitu user. user yang telah ter-registrasi dapat menggunakan semua fitur yang sudah dijelaskan di atas. Sedangkan user yang belum teregistrasi hanya dapat melihat list produk (tidak bisa membeli).

## How to use
1. Install all dependencies using `npm install` command
2. Run the website using `npm run start` command

*Note: Jalankan terlebih dahulu program backend yang berada pada folder backend
