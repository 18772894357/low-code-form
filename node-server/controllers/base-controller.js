class Controller {
  constructor(ctx, next) {
    this.ctx = ctx;
    this.next = next;
    this.ctx.json = (code, data) => {
      this.ctx.body = {
        code,
        data,
        success: +code === 0
      }
    }
  }
}

export default Controller