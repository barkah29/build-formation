import Logo from "@/Components/Logo";
import Layouts from "@/Layouts/Layouts";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
    return (
        <Layouts>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="my-[4rem] flex justify-center">
                            <Logo width={400} height={400} />
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    );
}
