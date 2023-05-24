import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Server {
    private static final String DB_URL = "jdbc:mysql://localhost:3307";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "";
    private static final String DB_NAME = "ecommerce";

    private JTextField nomeField;
    private JTextField cognomeField;

    public Server() {
        createDatabaseIfNotExists();

        JFrame frame = new JFrame("Registrazione");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));

        JPanel formPanel = new JPanel(new GridLayout(3, 2));

        JLabel nomeLabel = new JLabel("Nome:");
        nomeField = new JTextField();

        JLabel cognomeLabel = new JLabel("Cognome:");
        cognomeField = new JTextField();

        formPanel.add(nomeLabel);
        formPanel.add(nomeField);
        formPanel.add(cognomeLabel);
        formPanel.add(cognomeField);

        mainPanel.add(Box.createVerticalGlue());
        mainPanel.add(formPanel);
        mainPanel.add(Box.createVerticalGlue());

        JPanel buttonPanel = new JPanel();
        JButton okButton = new JButton("OK");
        okButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String nome = nomeField.getText();
                String cognome = cognomeField.getText();

                saveRegistrationData(nome, cognome);

                JOptionPane.showMessageDialog(frame, "Dati salvati con successo!");

                // Pulisci i campi dopo aver salvato i dati
                nomeField.setText("");
                cognomeField.setText("");
            }
        });
        buttonPanel.add(okButton);

        frame.add(mainPanel, BorderLayout.CENTER);
        frame.add(buttonPanel, BorderLayout.SOUTH);

        frame.pack();
        frame.setVisible(true);
    }

    public void createDatabaseIfNotExists() {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            Statement statement = conn.createStatement();
            // String createDatabaseQuer = "DROP DATABASE " + DB_NAME;
            // statement.executeUpdate(createDatabaseQuer);
            String createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS " + DB_NAME;
            statement.executeUpdate(createDatabaseQuery);

            // Seleziona il database "ecommerce"
            String useDatabaseQuery = "USE ecommerce";
            statement.executeUpdate(useDatabaseQuery);

            // Crea la tabella "utenti" con tre colonne
            String createTableQuery = "CREATE TABLE IF NOT EXISTS utenti (" +
                    "id INT AUTO_INCREMENT PRIMARY KEY," +
                    "nome VARCHAR(50)," +
                    "cognome VARCHAR(50)" +
                    ")";
            statement.executeUpdate(createTableQuery);

            System.out.println("Tabella 'utenti' creata con successo.");


        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void saveRegistrationData(String nome, String cognome) {
        try (Connection conn = DriverManager.getConnection(DB_URL + "/" + DB_NAME, DB_USERNAME, DB_PASSWORD)) {
            String sql = "INSERT INTO utenti (nome, cognome) VALUES (?, ?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, nome);
            statement.setString(2, cognome);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new Server();
            }
        });
    }
}