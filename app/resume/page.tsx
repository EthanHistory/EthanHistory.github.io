'use client';

import "@/app/utils/promisePolyfill";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import {ScrollShadow} from "@nextui-org/react";
import Layout from '../components/Layout';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


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
    <Layout>
      <ScrollShadow hideScrollBar className="mt-20">
        <Document file="profile/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={1000}/>
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </ScrollShadow>
    </Layout>
  );
};

export default Resume;
