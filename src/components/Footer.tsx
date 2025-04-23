import Link from "next/link"
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconMail } from "@tabler/icons-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Room Decor</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transforming spaces, inspiring lives through innovative interior design.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Us</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">123 Design Street, Creativity City, 12345</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Phone: (123) 456-7890</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Email: info@roomdecor.com</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <IconBrandFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <IconBrandTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <IconBrandInstagram className="w-6 h-6" />
              </a>
              <a href="mailto:info@roomdecor.com" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                <IconMail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Room Decor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

