import baseController from '../base-controller'
import fs from 'fs'
import { exec } from 'child_process'

class codeFormatController extends baseController {
  constructor (ctx, next) {
    super(ctx, next)
    this.codePath = './code.vue'
  }
  async writeCode (body) {
    const { code } = body
    await fs.writeFileSync(this.codePath, code)
  }
  async formatterCode () {
    const { body } = this.ctx.request
    await this.writeCode (body)
    await new Promise(resolve => {
      exec(`npx prettier --write ${this.codePath}`, (error, stdout, stderr) => {
        if (error) {
          console.log('error:', error)
          return
        }
        console.log('stdout:', stdout)
        if (stderr) {
          console.log('stderr:', stderr)
        }
        resolve()
      })
    })
    const data = await fs.readFileSync(this.codePath, 'utf-8')
    this.ctx.json(0, data)
  }
}

export default codeFormatController
