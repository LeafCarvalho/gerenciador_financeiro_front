import { Entradas } from './entradas/entradas'
import Investimentos from './investimentos/investimentos'
import Saidas from './saidas/saidas'

export const InfosUsuario = () => {
  return (
    <>
        <Entradas />
        <Investimentos />
        <Saidas />
    </>
  )
}