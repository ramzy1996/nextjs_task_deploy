import dynamic from "next/dynamic"
const DisplayPDF = dynamic(() => import('../components/DisplayPDF/DisplayPDF'));

const page = () => {
    const pdfUrl = 'https://storage.googleapis.com/my-spc/RamzyAhmed.pdf#view=FitH&page=1&toolbar=0'

    return (
        <DisplayPDF pdfUrl={pdfUrl} />
    )
}

export default page