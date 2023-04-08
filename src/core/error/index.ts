type ErrorType = "propertyError" | "fileExtractionError" | "additionalInfoError"

interface BlogErrorConstructorProps {
    errorType: ErrorType
    errorNameDescription: string
    message: string
    customErrorMessage?: string
}

class BlogError extends Error {
    protected errorType: ErrorType
    protected messageDivider =
        "\n\n----------------------------------------------------------------------------------------\n\n"
    protected messageTab = "      "

    protected makeErrorMessage = (
        mainErrorMessage: string,
        customErrorMessage?: string
    ) =>
        !customErrorMessage
            ? `${this.messageDivider}${this.messageTab}❎ Error Occurred, ${mainErrorMessage}${this.messageDivider}`
            : `${this.messageDivider}${this.messageTab}❎ Error Occurred, ${mainErrorMessage}\n${this.messageTab}❎ Check ${customErrorMessage}${this.messageDivider}`

    constructor({
        errorType,
        errorNameDescription,
        message,
        customErrorMessage,
    }: BlogErrorConstructorProps) {
        super("")
        this.errorType = errorType
        this.name = `${this.messageDivider}[ ❎ Error Occurred: ${this.errorType} -> ${errorNameDescription} 🛠 ]`
        this.message = this.makeErrorMessage(message, customErrorMessage)
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

type PropertyName<CustomProperty> =
    | Exclude<keyof CustomProperty, keyof Array<any>>
    | string
interface BlogPropertyErrorConstructorProps<CustomProperty>
    extends Pick<
        BlogErrorConstructorProps,
        "customErrorMessage" | "errorNameDescription"
    > {
    propertyName: PropertyName<CustomProperty>
    propertyType: PropertyType
    propertyDescription?: string
    errorDirectory?: string
    errorPropertyValue?: string
}

class BlogPropertyError<CustomProperty> extends BlogError {
    constructor({
        customErrorMessage,
        errorNameDescription,
        propertyName,
        propertyType,
        propertyDescription,
        errorPropertyValue,
        errorDirectory,
    }: BlogPropertyErrorConstructorProps<CustomProperty>) {
        const makePropertyErrorMessage = (
            propertyName: PropertyName<CustomProperty>,
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
            customErrorMessage,
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
        customErrorMessage,
    }: BlogErrorAdditionalInfoConstructorProps) {
        super({
            errorType: "additionalInfoError",
            errorNameDescription,
            message: "",
            customErrorMessage,
        })

        this.passedError = passedError

        if (passedError instanceof BlogError) {
            this.message = `${this.passedError}\n${this.messageTab}${message}\n${this.messageTab}${customErrorMessage}${this.messageDivider}`
        } else {
            this.message = `${this.messageDivider}${this.messageTab}${customErrorMessage}${this.messageDivider}${this.messageTab}Unknown ERROR😓:\n\n${this.passedError}\n${this.messageTab}\n${this.messageTab}Please Follow [ Error Call Stack ] to find error.${this.messageDivider}`
        }
    }
}

type ReadingFileFormat = ".json" | ".txt" | ".mdx" | "image"
interface BlogFileExtractionErrorConstructorProps
    extends Omit<
        BlogErrorConstructorProps,
        "errorType" | "customErrorMessage" | "message"
    > {
    encodingFormat?: BufferEncoding
    readingFileFormat: ReadingFileFormat
    readingFileName: string
    readingFileLocation: string
    customErrorMessage?: string
}

class BlogFileExtractionError extends BlogError {
    public readingFileLocation: string

    constructor({
        errorNameDescription,
        readingFileLocation,
        readingFileFormat,
        encodingFormat = "utf-8",
        readingFileName,
        customErrorMessage,
    }: BlogFileExtractionErrorConstructorProps) {
        const fileExtractionErrorMessage = encodingFormat
            ? `while extracting ${readingFileName}${readingFileFormat}`
            : `while extracting ${readingFileName}${readingFileFormat}, [ ✅ ENCODING FORMAT: ${encodingFormat} ]`

        const fileLocationMessage = !customErrorMessage
            ? `file location🔎: \n\n  ${readingFileLocation}`
            : `Read error: ${customErrorMessage}\n\n  file location🔎: \n\n  ${readingFileLocation}`

        super({
            errorType: "fileExtractionError",
            errorNameDescription,
            message: fileExtractionErrorMessage,
            customErrorMessage: fileLocationMessage,
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
