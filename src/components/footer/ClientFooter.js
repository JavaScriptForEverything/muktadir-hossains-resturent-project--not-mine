import React from 'react'

const ClientFooter = () => {
  return (
    <footer className="bg-white font-mono w-full first-letter:
    dark:bg-slate-800 dark:text-slate-200
    ">
            <hr />
            <p className='copyRightText text-center'>
              Copyright © {new Date().getFullYear()} | Developed & Maintained By{" "}
              <a className="text-violet-500 underline" href="https://rajit.net" target="_blank">
                rajIT Solutions Ltd
              </a>
              .
            </p>
          </footer>
  )
}

export default ClientFooter