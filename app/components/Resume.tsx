'use client';

import "@/app/utils/promisePolyfill";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import {ScrollShadow} from "@nextui-org/react";

// https://github.com/wojtekmaj/react-pdf/issues/1855
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const Resume = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  if (typeof Promise.withResolvers === "undefined") {
    if (typeof window !== 'undefined') {
      // @ts-expect-error This does not exist outside of polyfill which this is doing
      window.Promise.withResolvers = function () {
        let resolve, reject
        const promise = new Promise((res, rej) => {
          resolve = res
          reject = rej
        })
        return { promise, resolve, reject }
      }
    } else {
      // @ts-expect-error This does not exist outside of polyfill which this is doing
      global.Promise.withResolvers = function () {
        let resolve, reject
        const promise = new Promise((res, rej) => {
          resolve = res
          reject = rej
        })
        return { promise, resolve, reject }
      }
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <ScrollShadow hideScrollBar className="mt-96">
      <Document file="profile/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={1000}/>
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </ScrollShadow>
  );
};

export default Resume;
