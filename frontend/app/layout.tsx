import './globals.css'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

export const metadata = {
  title: 'DataInsight',
  description: 'DataInsight - Nền tảng trực quan hóa và phân tích dữ liệu mở',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
         <Navbar />
       </header>


        <main>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
