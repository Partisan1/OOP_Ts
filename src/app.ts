type Baseop = "sum" | "multiplier" |"mode" | "print"


class NumberSeries {
    private _count: number;
    private _value: number;
    private _list: number[];

    constructor(
        count : number,
        value: number,
        rng: (max: number) => number
    ){
        if (count <= 0) throw new Error("Számosság pozitív egész legyen")
        if (value <= 0) throw new Error("A felső határ egész legyen")
            this._count = count
            this._value = value
            this._list = Array.from({length: count}, () => rng(value))
    }
    get values(): readonly number[] {
        return this._list
    }

    set updateValues(arr: number[]){
        if (arr.length === 0) throw new Error("Nem lehet üres")
        if (!arr.every(n => Number.isFinite(n) && n > 0)) throw new Error("Minden elem pozitív egész legyen")
        this._list = [...arr];
        this._count = arr.length;
        this._value = Math.max(...arr)
    }
    get count(): number {return this._count}
    get v(): number {return this._value}

    mode():  number {
        const freq: Record<number, number> = {};
        for (let n of this._list) {
            freq[n] = (freq[n] ?? 0) + 1;
    }
    let best = this._list[0];
    for(let k of Object.keys(freq)){
        const key = Number(k)
        if (freq[key]! > freq[best!]!){
            best = key
        }
    }
    return best! 
}
sum() {return this._list.reduce((acc, number)=> acc + number, 0)}
multiplier() {return this._list.reduce((acc, number) => acc * number, 1)}

run(op: Baseop) {
    switch(op) {
        case "sum":
            console.log(`Összeg: ${this.sum()}`);
            break;
        case "multiplier":
            console.log(`Szorzat: ${this.multiplier}`);
            break;
        case "mode":
            console.log(`Leggyakoribb: ${this.mode}`);
            break;

        case "print":
            console.log(`Kiírás: `), this.values.join(", ");
            break;

        default:
            console.log("Helytelen művelet");
            break;

    }
}

static help(): void {
    console.log("Elérhető műveletek sum, multiplier, mode, print");
}
static rand(max: number): number{
    return Math.floor(Math.random()* max) +1
} 
}