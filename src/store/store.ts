import {create} from 'zustand';
import { IUsuario } from '../type/IUsuario'


type MenuStore ={
  MenuAberto: boolean;
  abrirMenu: () => void;
  fecharMenu: () => void;
  toogleMenu: () => void;
}

type UsuarioStore = {
  usuarios: IUsuario[];
  addToUsuario: (item: IUsuario) => void;
}

export const useUsuarioStore = create<UsuarioStore>((set) => {
  return {
    usuarios: [],
    addToUsuario: (item: IUsuario) => set((state) => ({usuarios: [...state.usuarios, item]})),
  }
});

export const useMenuStore = create<MenuStore>((set) => {
  return{
    MenuAberto: false,
    abrirMenu: () => set({MenuAberto : true}),
    fecharMenu: () => set({MenuAberto : false}),
    toogleMenu: () => set((state) => ({MenuAberto: !state.MenuAberto})),
  }  
});