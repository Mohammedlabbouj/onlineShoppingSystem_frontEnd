import React from 'react'

export default function Footer() {
   return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Deals
                </a>
              </li>
              <li>
                <a
                  href="/new"
                  className="text-muted-foreground hover:text-foreground"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/bestsellers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Bestsellers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="/warranty"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Warranty
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} ShopMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
