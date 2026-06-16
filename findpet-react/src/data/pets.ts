import type { Category, Pet } from "../types/pet";

// Categorias do carrossel. Apenas animais permitidos/legalizados para adoção.
// Os ícones são desenhos (SVG), não fotos reais. Basta soltar os arquivos
// em /public/assets/categories/ para que apareçam automaticamente.
export const categories: Category[] = [
  { id: "todos", label: "Todos", icon: "/assets/categories/todos.svg" },
  { id: "caes", label: "Cães", icon: "/assets/categories/caes.svg" },
  { id: "gatos", label: "Gatos", icon: "/assets/categories/gatos.svg" },
  { id: "roedores", label: "Roedores", icon: "/assets/categories/roedores.svg" },
  { id: "aves", label: "Aves", icon: "/assets/categories/aves.svg" },
];

// Dados mockados. No futuro, substitua por uma chamada à API REST
// (ver getPets() em services/petService.ts) mantendo o mesmo formato Pet.
export const pets: Pet[] = [
  {
    id: "luna",
    name: "Luna",
    category: "gatos",
    breed: "SRD",
    distance: 1.8,
    age: "1 ano",
    sex: "Fêmea",
    description:
      "Luna é uma gatinha doce e curiosa, adora um colo quentinho e ronrona baixinho enquanto observa tudo pela janela.",
    image: "/assets/pets/luna.png",
  },
  {
    id: "max",
    name: "Max",
    category: "caes",
    breed: "Labrador",
    distance: 2.5,
    age: "3 anos",
    sex: "Macho",
    description:
      "Max é cheio de energia e carinho. Adora brincar de buscar a bolinha e está só esperando uma família para chamar de sua.",
    image: "/assets/pets/max.png",
  },
  {
    id: "mel",
    name: "Mel",
    category: "caes",
    breed: "Vira-lata",
    distance: 3.2,
    age: "2 anos",
    sex: "Fêmea",
    description:
      "Mel é tranquila, companheira e muito amorosa. Gosta de cochilar ao sol e recebe todo mundo abanando o rabinho.",
    image: "/assets/pets/mel.png",
  },
  {
    id: "nina",
    name: "Nina",
    category: "gatos",
    breed: "Siamês",
    distance: 4.1,
    age: "8 meses",
    sex: "Fêmea",
    description:
      "Nina é elegante e brincalhona, adora explorar cantinhos altos e dormir enroladinha pertinho de quem ama.",
    image: "/assets/pets/nina.png",
  },
  {
    id: "pipoca",
    name: "Pipoca",
    category: "roedores",
    breed: "Hamster",
    distance: 1.2,
    age: "6 meses",
    sex: "Macho",
    description:
      "Pipoca é pequenino e cheio de charme. Passa o dia enchendo as bochechas de ração e correndo feliz na rodinha.",
    image: "/assets/pets/pipoca.png",
  },
  {
    id: "tico",
    name: "Tico",
    category: "aves",
    breed: "Calopsita",
    distance: 2.9,
    age: "1 ano",
    sex: "Macho",
    description:
      "Tico é falante e carismático, assobia musiquinhas pela manhã e adora ganhar carinho no topetinho.",
    image: "/assets/pets/tico.png",
  },
  {
    id: "amora",
    name: "Amora",
    category: "roedores",
    breed: "Porquinho-da-índia",
    distance: 5.0,
    age: "2 anos",
    sex: "Fêmea",
    description:
      "Amora é dócil e comunicativa, faz uns barulhinhos fofos quando está feliz e ama um pedacinho de cenoura fresquinha.",
    image: "/assets/pets/amora.png",
  },
  {
    id: "sol",
    name: "Sol",
    category: "aves",
    breed: "Canário",
    distance: 3.7,
    age: "10 meses",
    sex: "Macho",
    description:
      "Sol ilumina qualquer ambiente com seu canto alegre. É delicado, curioso e traz uma energia leve para a casa.",
    image: "/assets/pets/sol.png",
  },
];
