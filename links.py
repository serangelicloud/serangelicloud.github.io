import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import networkx as nx
import matplotlib.pyplot as plt

def get_internal_links(url, domain):
    """Fetch internal links from a URL that belong to the same domain."""
    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return set()

    soup = BeautifulSoup(response.text, 'html.parser')
    links = set()
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        # Convert relative URL to absolute URL
        full_url = urljoin(url, href)
        # Check if URL belongs to the same domain
        parsed = urlparse(full_url)
        if domain in parsed.netloc:
            links.add(full_url)
    return links

def crawl_website(start_url, max_pages=20):
    """Crawl a website and build a graph of its internal link structure."""
    domain = urlparse(start_url).netloc
    visited = set()
    to_visit = [start_url]
    graph = nx.DiGraph()

    while to_visit and len(visited) < max_pages:
        current = to_visit.pop(0)
        if current in visited:
            continue
        print(f"Crawling: {current}")
        visited.add(current)
        internal_links = get_internal_links(current, domain)
        for link in internal_links:
            graph.add_edge(current, link)
            if link not in visited:
                to_visit.append(link)
    return graph

if __name__ == '__main__':
    start_url = 'https://serangelicloud.github.io'  # Change this to your website URL
    graph = crawl_website(start_url, max_pages=20)
    
    # Debugging info: print number of nodes and edges
    print("Nodes:", len(graph.nodes()))
    print("Edges:", len(graph.edges()))
    
    # Visualize the graph using a spring layout
    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(graph)
    nx.draw_networkx(graph, pos, with_labels=True, node_color='lightblue', edge_color='gray', font_size=8)
    plt.title("Website Internal Links Graph")
    plt.axis('off')
    plt.show()
