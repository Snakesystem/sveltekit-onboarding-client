<script lang="ts">
  import { Accordion, AccordionItem } from "@sveltestrap/sveltestrap";
</script>

<Accordion>
  <h4>Apa yang perlu kamu siapkan ?</h4>
  <ol>
    <li>e-KTP</li>
    <li>NPWP (Wajib jika telah memiliki penghasilan)</li>
    <li>
      Memiliki rekening personal di BCA (Catatan: untuk pembukaan secara online,
      bank RDN yang dipilih harus BCA)
    </li>
    <li>
      Memiliki rekening personal di BCA (Catatan: untuk pembukaan secara online,
      bank RDN yang dipilih harus BCA)
    </li>
    <li>
      Memiliki rekening personal di BCA (Catatan: untuk pembukaan secara online,
      bank RDN yang dipilih harus BCA)
    </li>
  </ol>
  <h4>Frequently Asked Question (Pertanyaan umum)</h4>
  <AccordionItem>
    <h5 class="m-0" slot="header">Bagaimana cara membuka rekening efek RDN di Sekuritas?</h5>
    <ol>
      <li>Buka link https://example.com melalui PC, Android maupun iPhone (Catatan: Gunakan mobile browser Chrome untuk koneksi yang lebih stabil).</li>
      <li>Klik 'Daftar Akun Baru' untuk mendaftar. Lengkapi data pendaftaran lalu, klik 'Daftar'.</li>
      <li>Lengkapi data pendaftaran lalu, klik 'Daftar'.</li>
      <li>Pastikan data yang diisi sudah sesuai, lalu klik 'Submit'.</li>
      <li>Anda akan diminta untuk melakukan aktivasi akun, link aktivasi akan dikirimkan melalui email.</li>
      <li>Klik link aktivasi pada email, maka Anda akan diarahkan kembali ke halaman Registrasi Online.</li>
      <li>Login menggunakan email dan kata sandi, kemudian klik 'Masuk'.</li>
      <li>Lengkapi data & informasi pribadi dalam 4 langkah: Data Pribadi, Data Bank & Pekerjaan, Data Pendukung, serta Pernyataan (Catatan: Pastikan semua kolom yang bertanda bintang (*) sudah terisi).</li>
      <li>Unggah foto e-KTP, NPWP (jika ada), swafoto (selfie) dengan e-KTP, serta foto tanda tangan di kertas putih (Catatan: Pastikan tanda tangan sesuai dengan yang tertera pada e-KTP).</li>
      <li>Baca Syarat dan Ketentuan, lalu klik 'Setuju'.</li>
      <li>Pengisian Registrasi Online sudah selesai. Cek email secara berkala untuk menerima email konfirmasi pembukaan rekening.</li>
      <li>Selamat! Rekening efek Anda sudah jadi.</li>
    </ol>
  </AccordionItem>
  <AccordionItem>
    <h5 class="m-0" slot="header">Bagaimana jika KTP saya belum e-KTP</h5>
    <p>Calon Nasabah yang akan melakukan pembukaan rekening efek di Example Sekuritas wajib memiliki KTP Elektronik (e-KTP) sesuai dengan peraturan UU No. 23 Tahun 2006 tentang Administrasi Kependudukan</p>
  </AccordionItem>
  <AccordionItem>
    <h5 class="m-0" slot="header">Beberapa lama proses pembukaan rekening efek di Sekuritas?</h5>
    <ol>Pembukaan rekening efek membutuhkan waktu maksimum 2 hari kerja dengan tahapan sebagai berikut:
        <li>Apabila data sudah lengkap dan sesuai dengan persyaratan, pengajuan akan disetujui oleh Customer Service Example Sekuritas.</li>
        <li>Setelah disetujui oleh Customer Service Example Sekuritas, data Nasabah akan dikirimkan ke pihak terkait (KSEI dan Bank RDN).</li>
        <li>Setelah mendapatkan Rekening Dana Nasabah(RDN) dan Sub Rekening Efek (SRE), Anda dapat segera melakukan transaksi.</li>
    </ol>
  </AccordionItem>
  <AccordionItem>
    <h5 class="m-0" slot="header">Bagaimana cara menghubungi Sekuritas?</h5>
    <ol>Anda dapat menghubungi Example Sekuritas melalui:
        <li>Kantor Pusat: 082323443535</li>
        <li>Helpdesk: 082323443535</li>
        <li>Fax: 082323443535</li>
    </ol>
  </AccordionItem>
</Accordion>

<style lang="scss" scoped>
    ol {
        padding-left: 15px;
        li {
            margin-bottom: 7px;
        }
    }
</style>