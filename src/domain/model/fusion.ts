import { People } from "./people"
import { Planet } from "./planet"

export interface Fusion extends People, Planet {
  gravity: string,
  terrain: string
}
