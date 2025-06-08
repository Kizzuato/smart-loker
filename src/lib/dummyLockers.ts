export interface Locker {
  id: number
  label: string
  status: 'kosong' | 'terisi' | 'nonaktif' | 'aktif'
}

export const dummyLockers: Locker[] = [
  { id: 1, label: 'Loker 1', status: 'kosong' },
  { id: 2, label: 'Loker 2', status: 'terisi' },
  { id: 3, label: 'Loker 3', status: 'nonaktif' },
  { id: 4, label: 'Loker 4', status: 'kosong' },
  { id: 5, label: 'Loker 5', status: 'terisi' },
  { id: 6, label: 'Loker 6', status: 'kosong' },
]
