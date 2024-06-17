import json
import tkinter as tk
from tkinter import messagebox
import os

# Função para carregar dados do arquivo JSON
def load_data():
    try:
        file_path = 'C:\\Users\\lucas_xln2bob\\Desktop\\BotVenom-Vital\\src\\stages\\data.json'
        if not os.path.exists(file_path):
            messagebox.showerror("Error", f"Data file not found at {file_path}.")
            return []
        with open(file_path, 'r') as file:
            data_list = json.load(file)
            return data_list
    except FileNotFoundError:
        messagebox.showerror("Error", "Data file not found.")
        return []
    except json.JSONDecodeError:
        messagebox.showerror("Error", "Error decoding JSON data.")
        return []

# Função para salvar dados no arquivo JSON
def save_data(data):
    try:
        with open('C:\\Users\\lucas_xln2bob\\Desktop\\BotVenom-Vital\\src\\stages\\data.json', 'w') as file:
            json.dump(data, file, indent=2)
    except Exception as e:
        messagebox.showerror("Error", f"Error saving data: {e}")

# Função para adicionar item à lista e atualizar a interface
def add_item():
    item = entry.get()
    if item:
        listbox.insert(tk.END, item)
        entry.delete(0, tk.END)
        # Atualiza e salva a lista de dados
        data_list.append(item)
        save_data(data_list)
    else:
        messagebox.showwarning("Warning", "Please enter an item.")

# Função para remover item selecionado da lista
def remove_item():
    selected_items = listbox.curselection()
    if not selected_items:
        messagebox.showwarning("Warning", "Please select an item to remove.")
        return
    for index in selected_items[::-1]:  # Remove items a partir do final da lista
        listbox.delete(index)
        # Atualiza e salva a lista de dados
        del data_list[index]
    save_data(data_list)

# Configuração da janela principal
root = tk.Tk()
root.title("List Manager")
root.geometry("400x300")

# Campo de entrada para novos itens
entry = tk.Entry(root, width=50)
entry.pack(pady=10)

# Botão para adicionar item à lista
add_button = tk.Button(root, text="Add Item", command=add_item, bg="#007BFF", fg="white", font=("Arial", 12), relief="raised", bd=5)
add_button.pack(pady=5)

# Botão para remover item da lista
remove_button = tk.Button(root, text="Remove Item", command=remove_item, bg="#FF0000", fg="white", font=("Arial", 12), relief="raised", bd=5)
remove_button.pack(pady=5)

# Lista que exibe os itens adicionados
listbox = tk.Listbox(root, width=50, height=10)
listbox.pack(pady=10)

# Carregar dados do arquivo JSON e preencher a lista
data_list = load_data()
for item in data_list:
    listbox.insert(tk.END, item)

# Rodar o loop principal da aplicação
root.mainloop()
