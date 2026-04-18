import java.util.*;

public class MemoryGame {
    static int SIZE = 5;
    static int[][] board = new int[SIZE][SIZE];
    static boolean[][] isRevealed = new boolean[SIZE][SIZE];
    static int currentPlayer = 0;
    static int[] consecutiveWrong = new int[2]; 
    static int bonusTurns = 0; 
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) throws InterruptedException {
        initBoard();
        System.out.println("=== GAME LAT HINH 5x5 ===");
        System.out.println("Ban co 10 giay de nho...");
        showAll(true);
        Thread.sleep(10000); 
        
        clearScreen(); // Xoa bang xem truoc
        showAll(false);

        while (!isGameOver()) {
            playTurn();
        }
        System.out.println("\nCHUC MUNG! TAT CA CAC CAP DA DUOC MO.");
    }

    public static void initBoard() {
        List<Integer> cards = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            cards.add(i); cards.add(i);
        }
        cards.add(0); 
        Collections.shuffle(cards);
        int index = 0;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                board[i][j] = cards.get(index++);
            }
        }
    }

    public static void printBoard() {
        System.out.print("\n      0    1    2    3    4");
        System.out.println("\n    -------------------------");
        for (int i = 0; i < SIZE; i++) {
            System.out.print(i + " | ");
            for (int j = 0; j < SIZE; j++) {
                if (isRevealed[i][j]) System.out.printf(" [%2d]", board[i][j]);
                else System.out.print(" [*] ");
            }
            System.out.println();
        }
    }

    // Ham moi: Xoa man hinh bang cach day dong trong
    public static void clearScreen() {
        for (int i = 0; i < 50; i++) System.out.println();
    }

    public static void playTurn() throws InterruptedException {
        int otherPlayer = (currentPlayer == 0) ? 1 : 0;
        System.out.println("\n>> LUOT NGUOI CHOI " + (currentPlayer + 1) + " <<");

        int[] c1 = getValidInput("Chon o 1 (hang cach cot): ");
        isRevealed[c1[0]][c1[1]] = true;
        printBoard();

        if (board[c1[0]][c1[1]] == 0) {
            System.out.println("O so 0 khong co cap! O nay se luon hien.");
            consecutiveWrong[currentPlayer] = 0;
            return;
        }

        int[] c2 = getValidInput("Chon o 2 (hang cach cot): ");
        isRevealed[c2[0]][c2[1]] = true;
        printBoard();

        if (board[c1[0]][c1[1]] == board[c2[0]][c2[1]]) {
            System.out.println("=> DUNG ROI! Ban duoc lat tiep.");
            consecutiveWrong[currentPlayer] = 0;
            if (bonusTurns > 0) bonusTurns--;
        } else {
            System.out.println("=> SAI ROI!");
            consecutiveWrong[currentPlayer]++;
            Thread.sleep(2000); // Cho 2 giay de nho o sai
            
            // QUAN TRONG: Up bai lai va xoa man hinh truoc khi in luot tiep theo
            isRevealed[c1[0]][c1[1]] = false;
            isRevealed[c2[0]][c2[1]] = false;
            
            clearScreen(); // Day bảng có 2 số sai đi
            System.out.println("--- BANG DA DUOC UP LAI CHO NGUOI TIEP THEO ---");
            printBoard(); // In lại bảng sạch (chỉ còn các ô đã lật đúng)

            if (consecutiveWrong[currentPlayer] >= 2) {
                System.out.println("!!! Nguoi choi " + (currentPlayer + 1) + " sai 2 lan lien tiep. Doi phuong duoc lat 2 lan!");
                consecutiveWrong[currentPlayer] = 0;
                bonusTurns = 2;
                currentPlayer = otherPlayer;
            } else {
                if (bonusTurns > 0) {
                    bonusTurns--;
                    if (bonusTurns == 0) currentPlayer = otherPlayer;
                } else {
                    currentPlayer = otherPlayer;
                }
            }
        }
    }

    public static int[] getValidInput(String msg) {
        while (true) {
            try {
                System.out.print(msg);
                int r = sc.nextInt(); int c = sc.nextInt();
                if (r >= 0 && r < SIZE && c >= 0 && c < SIZE && !isRevealed[r][c]) return new int[]{r, c};
                System.out.println("Nhap lai (Toa do sai hoac o da mo)!");
            } catch (Exception e) {
                System.out.println("Chi nhap so nguyen!"); sc.next();
            }
        }
    }

    public static boolean isGameOver() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) if (!isRevealed[i][j]) return false;
        }
        return true;
    }

    public static void showAll(boolean reveal) {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) isRevealed[i][j] = reveal;
        }
        printBoard();
    }
}