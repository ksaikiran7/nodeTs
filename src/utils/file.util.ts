import * as fs from 'fs';
import htmlPdf from 'html-pdf';
import logger from './logger.util';
// tslint:disable-next-line:no-require-imports no-var-requires
const {PDFDocument} = require('pdf-lib');

export function htmlToPdfBuffer(html: string) {
    return new Promise((resolve, reject) => {
        htmlPdf.create(html, {
            format: 'A4',
            quality: '100',
            border: {
                top: '0.3in',            // default is 0, units: mm, cm, in, px
                right: '0.3in',
                bottom: '0.3in',
                left: '0.3in',
            },
        }).toBuffer((error, res) => {
            if (error) {
                reject(error);
            } else {
                resolve(res);
            }
        });
    });
}

export function htmlToPdf(html: string) {
    return new Promise((resolve, reject) => {
        htmlPdf.create(html, {format: 'Tabloid', orientation: 'landscape',
            quality: '100',
        }).toBuffer((error, res) => {
            if (error) {
                reject(error);
            } else {
                resolve(res);
            }
        });
    });
}

export async function savePdf(htmlStrings: string[], filePath: string) {
    try {
        if (!filePath.includes('.pdf')) {
            filePath += '.pdf';
        }
        const doc = await PDFDocument.create();
        let index = 0;
        for (const page of htmlStrings) {
            const buffer = await htmlToPdfBuffer(page);
            const cover = await PDFDocument.load(buffer);
            const contentPages = await doc.copyPages(cover, cover.getPageIndices());
            for (const p of contentPages) {
                doc.addPage(p);
            }
            index += 1;
        }
        return await fs.writeFileSync(filePath, await doc.save());
    } catch (error) {
        logger.error('ERROR occurred in utils.file.savepdf().');
        logger.error(error);
        throw error;
    }
}

export function deleteFiles(filePaths: string[]) {
    try {
        for (const file of filePaths) {
            fs.unlink(file, (error) => {
                if (error) {
                    logger.error(error);
                }
            });
        }
    } catch (error) {
        logger.error('ERROR occurred in utils.file.deleteFiles().');
        logger.error(error);
    }
}
