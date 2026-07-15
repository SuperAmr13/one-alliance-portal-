import Button from "@/components/ui/Button";
export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-blue-500/20">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
               <h1 className="text-3xl font-extrabold text-blue-400 tracking-wider">
                  ONe
                  </h1>

                <div className="flex items-center gap-3">
  <Button href="/login">
    Enter Portal
  </Button>

  <Button href="/register" variant="secondary">
    Request Access
  </Button>
</div> 
            </div>
        </nav>
    );
}