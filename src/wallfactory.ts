export class WallFactory {
    private pxdatacache: any = []

    public getpxdata(ctx: CanvasRenderingContext2D, height: number, r: number, g: number, b: number, a: number) {
        let data = this.pxdatacache[height]
        if (data == null) {
            data = this.createpxdata(ctx, height, r, g, b, a)
            this.pxdatacache[height] = data
        }
        return data
    }

    private createpxdata(ctx: CanvasRenderingContext2D, height: number, r: number, g: number, b: number, a: number) {
        let pxdata = ctx.createImageData(1, height)
        let h = 0
        while (h < 4 * height) {
            pxdata.data[h++] = r
            pxdata.data[h++] = g
            pxdata.data[h++] = b
            pxdata.data[h++] = a
        }
        return pxdata
    }
}