export default class BuildEmailDataHelper {
    // ===== Body Template data =====
    public title: string | null;
    public img: string | null;
    public description: string | null;
    public imageData: string | null;
    public template: string | null;
    public templateFile: string | null;

    public dataTemplate: any | null;

    // ===== Config email =====
    public to: string | null;
    public subject: string | null;
    public text: string | null;
    public from: string | null;

    constructor(data) {
        // Use nullish coalescing operator to handle null or undefined values
        this.title = data.title ?? null;
        this.img = data.img ?? null;
        this.description = data.description ?? null;
        this.to = data.to ?? null;
        this.subject = data.subject ?? null;
        this.text = data.text ?? null;
        this.from = data.from ?? null;
        this.imageData = data.imageData ?? null;
        this.template = data.template ?? null;
        this.templateFile = data.templateFile ?? null;
        this.dataTemplate = data.dataTemplate ?? null;

    }
}
