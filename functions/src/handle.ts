import nanoid from 'nanoid'
import {db} from './initialize'
import {Request, Response} from 'express'

export const home = (req: Request, res: Response) => {
    return res.render('index')
}

export const getPlayers = async (req: Request, res: Response) => {
    const {search, sort} = req.query
    let players: any = []

    try {
        const r = await db.collection("nba_salary").get()
        const promises = r.docs.map(async (doc: any) => {
            doc = await doc.data()
            players = [...players, doc]
        })

        Promise.all(promises)
            .then(() => {
                const result = query(players, search, sort)
                return res.status(200).json({ status: "success", result })
            })
            .catch(e => res.status(404).json({ status: "fail", data: {} }))
    } catch (e) {
        return res.status(404).json({ status: "fail", data: {} })
    }
}

export const getPlayer = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const r = await db
            .collection("nba_salary")
            .doc(id)
            .get()
        if (r.exists) {
            const doc = r.data()
            return res.status(200).json({ status: "success", data: doc })
        }
        return res.status(404).json({ status: "fail", data: {} })
    } catch (e) {
        return res.status(404).json({ status: "fail", data: {} })
    }
}

export const addPlayer = async (req: Request, res: Response) => {
    const { Player, Team, Salary } = req.body

    validate(Player, Team, Salary, res)

    const id = nanoid(10)
    const doc = { Player, Team, Salary, ID: id }

    try {
        await db
            .collection("nba_salary")
            .doc(id)
            .set(doc)
        return res.status(200).json({ status: "success", data: doc })
    } catch (e) {
        res.status(404).json({ status: "fail", data: {} })
    }
}

export const updatePlayer = async (req: Request, res: Response) => {
    const { id } = req.params
    const { Player, Team, Salary } = req.body

    validate(Player, Team, Salary, res)

    const doc = { Player, Team, Salary, ID: id }

    try {
        await db
            .collection("nba_salary")
            .doc(id)
            .set(doc)
        return res.status(200).json({ status: "success", data: doc })
    } catch (e) {
        res.status(404).json({ status: "fail", data: {} })
    }
}

export const deletePlayer = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await db
            .collection("nba_salary")
            .doc(id)
            .delete()
        return res.status(200).json({ status: "success", data: {} })
    } catch (e) {
        res.status(404).json({ status: "fail", data: {} })
    }
}

const validate = (Player: string, Team: string, Salary: string, res: Response) => {
    if (typeof Player !== "string") {
        return res
            .status(404)
            .json({ status: "fail", data: { title: "Player must be a string" } })
    }
    if (typeof Team !== "string") {
        return res
            .status(404)
            .json({ status: "fail", data: { title: "Team must be a string" } })
    }
    if (typeof Salary !== "string") {
        return res
            .status(404)
            .json({ status: "fail", data: { title: "Salary must be a string" } })
    }

    if (!Player) {
        return res
            .status(404)
            .json({ status: "fail", data: { title: "Missing Player" } })
    }
    if (!Team) {
        return res
            .status(404)
            .json({ status: "fail", data: { title: "Missing Team" } })
    }
    if (!Salary) {
        return res
            .status(404)
            .json({ status: "fail", data: { title: "Missing Salary" } })
    }
}

const query = (data: any, search: string, sort: string) => {
    let result: Array<any> = data

    if (search) {
        result = data.filter((item: any) => item.Player.match(new RegExp(search, 'ig')))
    }

    if (sort) {
        const [attr, type] = sort.split('_')
        if (attr === 'player') { result = result.sort((a, b) => a.Player.localeCompare(b.Player))}
        if (attr === 'salary') { result = result.sort((a, b) => b.Salary - a.Salary)}
        if (type === 'desc') { result = result.reverse()}
    }

    return result
} 