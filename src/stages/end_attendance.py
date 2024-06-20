import tkinter as tk
from tkinter import messagebox
import json
import os

# Caminho para o arquivo JSON
json_file_path = 'src\stages\data.json'

# Função para carregar os dados do arquivo JSON
def load_data():
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data
    else:
        messagebox.showerror("Erro", "Arquivo JSON não encontrado!")
        return None

# Função para atualizar a listbox com os clientes
def update_client_listbox():
    client_listbox.delete(0, tk.END)  # Limpa a listbox
    data = load_data()
    if data and '👤 Cliente' in data:
        for client in data['👤 Cliente']:
            client_listbox.insert(tk.END, client)

# Função para encerrar o atendimento de um cliente
def end_attendance():
    selected_client = client_listbox.get(tk.ACTIVE)
    if selected_client:
        if messagebox.askyesno("Encerrar Atendimento", f"Deseja encerrar o atendimento do cliente {selected_client}?"):
            data = load_data()
            if data and '👤 Cliente' in data:
                # Atualizar o stage do cliente para 1
                data['👤 Cliente'][selected_client]['stage'] = '0'
                # Atualizar o arquivo JSON
                with open(json_file_path, 'w', encoding='utf-8') as file:
                    json.dump(data, file, ensure_ascii=False, indent=2)
                messagebox.showinfo("Sucesso", "Atendimento encerrado com sucesso!")
                update_client_listbox()
            else:
                messagebox.showwarning("Aviso", "Cliente não encontrado no arquivo JSON!")
    else:
        messagebox.showwarning("Aviso", "Nenhum cliente selecionado!")

def refresh_data():
    update_client_listbox()
    messagebox.showinfo("Atualização", "Dados atualizados com sucesso!")

# Criar a interface gráfica
root = tk.Tk()
root.title("Encerrar Atendimento")

frame = tk.Frame(root)
frame.pack(padx=20, pady=20)

# Listbox para listar os clientes
client_listbox = tk.Listbox(frame, width=50, height=10)
client_listbox.pack(pady=10)

# Botão para encerrar atendimento
end_button = tk.Button(frame, text="Encerrar Atendimento", command=end_attendance)
end_button.pack(pady=10)

# Botão para atualizar dados
refresh_button = tk.Button(frame, text="Atualizar Dados", command=refresh_data)
refresh_button.pack(pady=10)

# Atualizar a listbox com os clientes
update_client_listbox()

root.mainloop()
