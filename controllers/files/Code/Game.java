import java.util.*;

interface Interactable {
    void interact(Player player);
}

class Location {
    private String description;
    private Map<String, Location> directions = new HashMap<>();
    private List<Interactable> items = new ArrayList<>();

    public Location(String description) {
        this.description = description;
    }

    public void addDirection(String direction, Location location) {
        directions.put(direction, location);
    }

    public void addItem(Interactable item) {
        items.add(item);
    }

    public Location move(String direction) {
        return directions.get(direction);
    }

    public void interact(Player player) {
        for (Interactable item : items) {
            item.interact(player);
        }
    }

    public void describe() {
        System.out.println(description);
        if (!items.isEmpty()) {
            System.out.println("You see here:");
            for (Interactable item : items) {
                if (item instanceof Item) {
                    System.out.println(((Item) item).getName());
                }
            }
        }
        System.out.println("You can go:");
        for (String direction : directions.keySet()) {
            System.out.println(direction);
        }
    }
}

class Item implements Interactable {
    private String name;

    public Item(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void interact(Player player) {
        player.addToInventory(this);
        System.out.println("You picked up " + name);
    }
}

class Player {
    private Location location;
    private List<Item> inventory = new ArrayList<>();

    public Player(Location location) {
        this.location = location;
    }

    public void moveToLocation(Location location) {
        this.location = location;
        location.describe();
    }

    public void addToInventory(Item item) {
        inventory.add(item);
    }

    public void interact() {
        location.interact(this);
    }
}

public class AdventureGame {
    public static void main(String[] args) {
        // Create locations
        Location forest = new Location("You are in a forest");
        Location cave = new Location("You are in a dark cave");
        forest.addDirection("north", cave);
        cave.addDirection("south", forest);

        // Create items
        Item sword = new Item("a shiny sword");
        forest.addItem(sword);

        // Create player
        Player player = new Player(forest);

        // Start game
        Scanner scanner = new Scanner(System.in);
        while (true) {
            String command = scanner.nextLine();
            if (command.equals("quit")) {
                break;
            } else if (command.equals("interact")) {
                player.interact();
            } else {
                player.moveToLocation(forest.move(command));
            }
        }
    }
}
