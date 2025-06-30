export interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  histories: string[];
  imageUrl: string;
}

export interface DragonWithoutId {
  id?: string;
  name: string;
  type: string;
  imageUrl: string;
  histories: string[];
}