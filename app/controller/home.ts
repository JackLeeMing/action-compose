import { Controller } from 'egg';
import { version as appVersion } from '../../package.json'
import utils from '../utils/time'
export default class HomeController extends Controller {
    public async index() {
        const { ctx, app } = this;
        const { status } = ctx.app.redis
        const { version } = await ctx.app.mongoose.connection.db.command({ buildInfo: 1 })
        ctx.helper.success({
            ctx, res: {
                dbVersion: version,
                redisStatus: status,
                appVersion,
                env: process.env.PING_ENV,
                config: app.config.baseUrl,
            }
        })
    }

    public async home() {
        const { ctx } = this;
        const date = new Date()
        const time = utils.dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
        ctx.body = {
            errno: 0,
            message: `Welcome to egg js now is: ${time}`
        }
    }
}
