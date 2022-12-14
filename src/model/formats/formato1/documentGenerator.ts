import pdfmake from 'pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from '../../../util/resources';
import { Formato1Fields } from './fields';
import { Strings } from './strings';
import { TableInfo } from './tableInfo';
import { generateTitleTable } from './tables/titleTable';
import { generateTable1 } from './tables/table1';
import { generateTable2 } from './tables/table2';
import { generateTable3 } from './tables/table3';
import { generateTable4 } from './tables/table4';
import { generateTable5 } from './tables/table5';
import { generateTable6 } from './tables/table6';
import { generateTable7 } from './tables/table7';
import { generateTable8 } from './tables/table8';
import { fontSizes, smallMarginSize } from '../../../util/constants';

export function parseJsonToDocumentFields(json: any): Formato1Fields[] {
    // TODO: Here we should generate some checks for the data that is being processed.
    return [json];
}

export function generatePdf(
    documentDefinition: TDocumentDefinitions,
    callback: (document: NodeJS.ReadableStream) => void
) {
    const printer = new pdfmake(fonts);
    const pdfDoc = printer.createPdfKitDocument(documentDefinition);

    callback(pdfDoc);
    pdfDoc.end();
}

export function generateDocumentDefinition(
    fields: Formato1Fields[]
): TDocumentDefinitions {
    const tableInfo = new TableInfo();

    let content: Content[] = [];
    // This means the document has more than one page.
    if (fields.length > 1) {
        // TODO: We have to makeout a way to generate the documents for more
        // than one page.
    } else {
        content = generateSinglePageContent(fields[0], tableInfo);
    }

    return {
        pageSize: 'LEGAL',
        pageMargins: [smallMarginSize, smallMarginSize],
        content: content,
    };
}

function generateSinglePageContent(
    fields: Formato1Fields,
    tableInfo: TableInfo
): Content[] {
    const content: Content[] = [];

    content.push(generateTitleTable(fields, tableInfo));
    content.push({
        text: Strings.titleA,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable1(fields, tableInfo));
    content.push({
        text: Strings.titleB,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable2(fields, tableInfo));
    content.push({
        text: Strings.titleC,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable3(fields, tableInfo));
    content.push({
        text: Strings.titleD,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push({
        text: Strings.fields.ifMoreSpaceIsNeeded,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable4(fields, tableInfo));
    content.push({
        text: Strings.titleE,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push({
        text: Strings.fields.ifMoreSpaceIsNeeded,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable5(fields, tableInfo));
    content.push({
        text: Strings.titleF,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable6(fields, tableInfo));
    content.push({
        text: Strings.titleG,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable7(fields, tableInfo));
    content.push({
        text: Strings.important,
        alignment: 'center',
        bold: true,
        fontSize: fontSizes.tiny,
    });
    content.push(generateTable8(fields, tableInfo));
    return content;
}
