type ErrorType = "propertyError" | "fileExtractionError" | "additionalInfoError"

interface BlogErrorConstructorProps {
    errorType: ErrorType
    errorNameDescription: string
    message: string
    customeErrorMessage?: string
}

class BlogError extends Error {
    protected errorType: ErrorType
    protected messageDivider =
        "\n\n----------------------------------------------------------------------------------------\n\n"
    protected messageTab = "      "

    protected makeErrorMessage = (
        mainErrorMessage: string,
        customeErrorMessage?: string
    ) =>
        !customeErrorMessage
            ? `${this.messageDivider}${this.messageTab}❎ Error Occured, ${mainErrorMessage}${this.messageDivider}`
            : `${this.messageDivider}${this.messageTab}❎ Error Occured, ${mainErrorMessage}\n${this.messageTab}❎ Check ${customeErrorMessage}${this.messageDivider}`

    constructor({
        errorType,
        errorNameDescription,
        message,
        customeErrorMessage,
    }: BlogErrorConstructorProps) {
        super("")
        this.errorType = errorType
        this.name = `${this.messageDivider}[ 🛠 ERROR_OCCURED: ${this.errorType} -> ${errorNameDescription} 🛠 ]`
        this.message = this.makeErrorMessage(message, customeErrorMessage)
    }
}

type PropertyType =
    | "string"
    | "number"
    | "boolean"
    | "symbol"
    | "string[]"
    | "number[]"
    | "boolean[]"
    | "symbol[]"
    | "Object"

type PropertyName<CustomeProperty> =
    | Exclude<keyof CustomeProperty, keyof Array<any>>
    | string
interface BlogPropertyErrorConstructorProps<CustomeProperty>
    extends Pick<
        BlogErrorConstructorProps,
        "customeErrorMessage" | "errorNameDescription"
    > {
    propertyName: PropertyName<CustomeProperty>
    propertyType: PropertyType
    propertyDescription?: string
    errorDirectory?: string
    errorPropertyValue?: string
}

class BlogPropertyError<CustomeProperty> extends BlogError {
    constructor({
        customeErrorMessage,
        errorNameDescription,
        propertyName,
        propertyType,
        propertyDescription,
        errorPropertyValue,
        errorDirectory,
    }: BlogPropertyErrorConstructorProps<CustomeProperty>) {
        const makePropertyErrorMessage = (
            propertyName: PropertyName<CustomeProperty>,
            propertyType: PropertyType,
            errorPropertyValue?: string
        ) => {
            const propertyNameString = String(propertyName)
            const description =
                propertyDescription ??
                `required❗️, not empty ${propertyType}❗️`

            return `[${propertyNameString}] problem at ${errorDirectory}: \n\n      ${propertyNameString}: ${String(
                errorPropertyValue ?? propertyType
            )} -> ${description}\n`
        }

        super({
            errorType: "propertyError",
            errorNameDescription,
            message: makePropertyErrorMessage(
                propertyName,
                propertyType,
                errorPropertyValue
            ),
            customeErrorMessage,
        })
    }
}

interface BlogErrorAdditionalInfoConstructorProps
    extends Omit<BlogErrorConstructorProps, "errorType"> {
    passedError: unknown
}
class BlogErrorAdditionalInfo extends BlogError {
    private passedError: unknown
    constructor({
        passedError,
        errorNameDescription,
        message,
        customeErrorMessage,
    }: BlogErrorAdditionalInfoConstructorProps) {
        super({
            errorType: "additionalInfoError",
            errorNameDescription,
            message: "",
            customeErrorMessage,
        })

        this.passedError = passedError

        if (passedError instanceof BlogError) {
            this.message = `${this.passedError}\n${this.messageTab}${message}\n${this.messageTab}${customeErrorMessage}${this.messageDivider}`
        } else {
            this.message = `${this.messageDivider}${this.messageTab}${customeErrorMessage}${this.messageDivider}${this.messageTab}Unknown ERROR😓:\n\n${this.passedError}\n${this.messageTab}\n${this.messageTab}Please Follow [ Error Call Stack ] to find error.${this.messageDivider}`
        }
    }
}

type ReadingFileFormat = ".json" | ".txt" | ".mdx" | "image"
interface BlogFileExtractionErrorConstructorProps
    extends Omit<
        BlogErrorConstructorProps,
        "errorType" | "customeErrorMessage" | "message"
    > {
    encodingFormat?: BufferEncoding
    readingFileFormat: ReadingFileFormat
    readingFileName: string
    readingFileLocation: string
    customeErrorMessage?: string
}

class BlogFileExtractionError extends BlogError {
    public readingFileLocation: string

    constructor({
        errorNameDescription,
        readingFileLocation,
        readingFileFormat,
        encodingFormat = "utf-8",
        readingFileName,
        customeErrorMessage,
    }: BlogFileExtractionErrorConstructorProps) {
        const fileExtractionErrorMessage = encodingFormat
            ? `while extracting ${readingFileName}${readingFileFormat}`
            : `while extracting ${readingFileName}${readingFileFormat}, [ ✅ ENCODING FORMAT: ${encodingFormat} ]`

        const fileLocationMessage = !customeErrorMessage
            ? `file location🔎: \n\n  ${readingFileLocation}`
            : `Read error: ${customeErrorMessage}\n\n  file location🔎: \n\n  ${readingFileLocation}`

        super({
            errorType: "fileExtractionError",
            errorNameDescription,
            message: fileExtractionErrorMessage,
            customeErrorMessage: fileLocationMessage,
        })

        this.readingFileLocation = readingFileLocation
    }
}

export {
    BlogError,
    BlogErrorAdditionalInfo,
    BlogPropertyError,
    BlogFileExtractionError,
}
